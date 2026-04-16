import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, n as LoaderCircle, L as Link, B as Button, k as ue } from "./index-m1b7ux88.js";
import { C as Card, I as Input } from "./card-BiIrcdLu.js";
import { L as Label, T as Textarea, a as Link2, X, I as ImagePlus } from "./textarea-xTUCgKfV.js";
import { d as useAddGameLink, E as ExternalBlob } from "./use-game-links-DVa0Tj36.js";
import { A as ArrowLeft } from "./arrow-left-D0ipnvYs.js";
const ALLOWED_STORES = [
  "store.steampowered.com",
  "steampowered.com",
  "epicgames.com",
  "itch.io",
  "gog.com",
  "humblebundle.com",
  "xbox.com",
  "microsoft.com",
  "playstation.com",
  "nintendo.com",
  "origin.com",
  "ea.com",
  "ubisoft.com",
  "battle.net",
  "blizzard.com",
  "indiegala.com",
  "greenmangaming.com",
  "fanatical.com"
];
function isAllowedStoreUrl(url) {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    return ALLOWED_STORES.some(
      (store) => parsed.hostname === store || parsed.hostname.endsWith(`.${store}`)
    );
  } catch {
    return false;
  }
}
const INITIAL_FORM = { title: "", description: "", url: "" };
function validate(form, imageFile) {
  const errors = {};
  if (!form.title.trim()) errors.title = "Title is required";
  if (!form.description.trim()) errors.description = "Description is required";
  if (!form.url.trim()) {
    errors.url = "URL is required";
  } else if (!isAllowedStoreUrl(form.url.trim())) {
    errors.url = "Must be a link to an official store (Steam, Epic, itch.io, GOG, etc.)";
  }
  if (!imageFile) errors.image = "Cover image is required";
  return errors;
}
function AddGamePage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const navigate = useNavigate();
  const addGame = useAddGameLink();
  const fileInputRef = reactExports.useRef(null);
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      login();
    }
  }, [isAuthenticated, isInitializing, login]);
  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      const errs = validate({ ...form, [field]: value }, imageFile);
      setErrors((e) => ({ ...e, [field]: errs[field] }));
    }
  };
  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate(form, imageFile);
    setErrors((e) => ({ ...e, [field]: errs[field] }));
  };
  const handleImageChange = reactExports.useCallback((file) => {
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setErrors((e) => ({ ...e, image: void 0 }));
    setTouched((t) => ({ ...t, image: true }));
  }, []);
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0] ?? null;
    if (file == null ? void 0 : file.type.startsWith("image/")) handleImageChange(file);
  };
  const removeImage = () => {
    handleImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form, imageFile);
    setErrors(errs);
    setTouched({ title: true, description: true, url: true, image: true });
    if (Object.keys(errs).length > 0) return;
    try {
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      const result = await addGame.mutateAsync({
        title: form.title.trim(),
        description: form.description.trim(),
        url: form.url.trim(),
        image: blob
      });
      ue.success("Game link added!");
      navigate({ to: "/game/$id", params: { id: result.id.toString() } });
    } catch {
      ue.error("Failed to add game link. Please try again.");
      setUploadProgress(0);
    }
  };
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-24",
        "data-ocid": "add_game.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
      }
    );
  }
  if (!isAuthenticated) return null;
  const isPending = addGame.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-10 max-w-2xl",
      "data-ocid": "add_game.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6",
            "data-ocid": "add_game.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Browse"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-3xl text-foreground mb-2", children: "Add a Game Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Share a game from Steam, Epic Games, itch.io, GOG, or any official store." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", noValidate: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", className: "font-display font-semibold", children: "Game Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "title",
                value: form.title,
                onChange: (e) => setField("title", e.target.value),
                onBlur: () => handleBlur("title"),
                placeholder: "e.g. Hollow Knight",
                className: "bg-background border-input",
                "data-ocid": "add_game.title_input"
              }
            ),
            errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "add_game.title.field_error",
                children: errors.title
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", className: "font-display font-semibold", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "description",
                value: form.description,
                onChange: (e) => setField("description", e.target.value),
                onBlur: () => handleBlur("description"),
                placeholder: "What's this game about? Why do you love it?",
                rows: 4,
                className: "bg-background border-input resize-none",
                "data-ocid": "add_game.description_input"
              }
            ),
            errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "add_game.description.field_error",
                children: errors.description
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "url", className: "font-display font-semibold", children: "Official Store Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "url",
                  type: "url",
                  value: form.url,
                  onChange: (e) => setField("url", e.target.value),
                  onBlur: () => handleBlur("url"),
                  placeholder: "https://store.steampowered.com/app/...",
                  className: "pl-10 bg-background border-input",
                  "data-ocid": "add_game.url_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Accepted: Steam, Epic Games, itch.io, GOG, Humble Bundle, Xbox, PlayStation, Nintendo, EA, Ubisoft, Battle.net" }),
            errors.url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "add_game.url.field_error",
                children: errors.url
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display font-semibold", children: "Cover Image" }),
            imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg overflow-hidden border border-border aspect-video max-h-52", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imagePreview,
                  alt: "Preview",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: removeImage,
                  className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 hover:bg-background flex items-center justify-center border border-border transition-smooth",
                  "aria-label": "Remove image",
                  "data-ocid": "add_game.remove_image_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              ),
              isPending && uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary transition-all duration-300",
                  style: { width: `${uploadProgress}%` }
                }
              ) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full border-2 border-dashed border-input rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-smooth",
                onDragOver: (e) => e.preventDefault(),
                onDrop: handleFileDrop,
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                "aria-label": "Upload cover image",
                "data-ocid": "add_game.image_dropzone",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-10 h-10 mx-auto mb-3 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground mb-1", children: "Drop image here or click to browse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PNG, JPG, WEBP — max 10 MB" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: (e) => {
                  var _a;
                  const file = ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null;
                  handleImageChange(file);
                },
                "data-ocid": "add_game.image_upload_button"
              }
            ),
            errors.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "add_game.image.field_error",
                children: errors.image
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: isPending,
                className: "bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold gap-2 flex-1",
                "data-ocid": "add_game.submit_button",
                children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  uploadProgress > 0 && uploadProgress < 100 ? `Uploading ${uploadProgress}%…` : "Saving…"
                ] }) : "Add Game Link"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/" }),
                "data-ocid": "add_game.cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  AddGamePage
};
