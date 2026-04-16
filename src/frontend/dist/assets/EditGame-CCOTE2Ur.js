import { i as useParams, a as useNavigate, u as useAuth, r as reactExports, k as ue, j as jsxRuntimeExports, S as Skeleton, B as Button, L as Link, n as LoaderCircle } from "./index-m1b7ux88.js";
import { C as Card, I as Input } from "./card-BiIrcdLu.js";
import { L as Label, T as Textarea, a as Link2, X, I as ImagePlus } from "./textarea-xTUCgKfV.js";
import { b as useGameLink, e as useUpdateGameLink, E as ExternalBlob } from "./use-game-links-DVa0Tj36.js";
import { T as TriangleAlert } from "./triangle-alert-DcQ_wBHg.js";
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
function validate(form, imageFile, existingImageUrl) {
  const errors = {};
  if (!form.title.trim()) errors.title = "Title is required";
  if (!form.description.trim()) errors.description = "Description is required";
  if (!form.url.trim()) {
    errors.url = "URL is required";
  } else if (!isAllowedStoreUrl(form.url.trim())) {
    errors.url = "Must be a link to an official store (Steam, Epic, itch.io, GOG, etc.)";
  }
  if (!imageFile && !existingImageUrl) errors.image = "Cover image is required";
  return errors;
}
function EditGamePage() {
  const { id } = useParams({ from: "/edit/$id" });
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, principal } = useAuth();
  const { data: game, isLoading } = useGameLink(id ? BigInt(id) : void 0);
  const updateGame = useUpdateGameLink();
  const fileInputRef = reactExports.useRef(null);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    url: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [initialized, setInitialized] = reactExports.useState(false);
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [existingImageUrl, setExistingImageUrl] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
      ue("Please sign in to edit a game link.");
    }
  }, [isAuthenticated, isInitializing, navigate]);
  reactExports.useEffect(() => {
    var _a, _b;
    if (game && !initialized) {
      setForm({
        title: game.title,
        description: game.description,
        url: game.url
      });
      const url = ((_b = (_a = game.image) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? null;
      setExistingImageUrl(url);
      setImagePreview(url);
      setInitialized(true);
    }
  }, [game, initialized]);
  const isOwner = isAuthenticated && principal && game && principal.toString() === game.submittedBy.toString();
  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      const errs = validate(
        { ...form, [field]: value },
        imageFile,
        existingImageUrl
      );
      setErrors((e) => ({ ...e, [field]: errs[field] }));
    }
  };
  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate(form, imageFile, existingImageUrl);
    setErrors((e) => ({ ...e, [field]: errs[field] }));
  };
  const handleImageChange = reactExports.useCallback(
    (file) => {
      if (!file) {
        setImageFile(null);
        setImagePreview(existingImageUrl);
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setErrors((e) => ({ ...e, image: void 0 }));
      setTouched((t) => ({ ...t, image: true }));
    },
    [existingImageUrl]
  );
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0] ?? null;
    if (file == null ? void 0 : file.type.startsWith("image/")) handleImageChange(file);
  };
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!game) return;
    const errs = validate(form, imageFile, existingImageUrl);
    setErrors(errs);
    setTouched({ title: true, description: true, url: true, image: true });
    if (Object.keys(errs).length > 0) return;
    try {
      let imageBlob;
      if (imageFile) {
        const bytes = new Uint8Array(await imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setUploadProgress(pct);
        });
      } else {
        imageBlob = ExternalBlob.fromURL(existingImageUrl);
      }
      await updateGame.mutateAsync({
        id: game.id,
        request: {
          title: form.title.trim(),
          description: form.description.trim(),
          url: form.url.trim(),
          image: imageBlob
        }
      });
      ue.success("Game link updated!");
      navigate({ to: "/game/$id", params: { id: game.id.toString() } });
    } catch {
      ue.error("Failed to update game link. Please try again.");
      setUploadProgress(0);
    }
  };
  if (isLoading || isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-10 max-w-2xl",
        "data-ocid": "edit_game.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-48 mb-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["f1", "f2", "f3", "f4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, k)) })
        ]
      }
    );
  }
  if (!game || !isOwner) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-24 text-center",
        "data-ocid": "edit_game.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-12 h-12 text-destructive mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "You can only edit your own game links." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Back to Browse" }) })
        ]
      }
    );
  }
  const isPending = updateGame.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-10 max-w-2xl",
      "data-ocid": "edit_game.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/game/$id",
            params: { id: game.id.toString() },
            className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6",
            "data-ocid": "edit_game.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Game"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-3xl text-foreground mb-2", children: "Edit Game Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "Update the details for “",
            game.title,
            "”"
          ] })
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
                className: "bg-background border-input",
                "data-ocid": "edit_game.title_input"
              }
            ),
            errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "edit_game.title.field_error",
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
                rows: 4,
                className: "bg-background border-input resize-none",
                "data-ocid": "edit_game.description_input"
              }
            ),
            errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "edit_game.description.field_error",
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
                  className: "pl-10 bg-background border-input",
                  "data-ocid": "edit_game.url_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Accepted: Steam, Epic Games, itch.io, GOG, Humble Bundle, Xbox, PlayStation, Nintendo, EA, Ubisoft, Battle.net" }),
            errors.url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "edit_game.url.field_error",
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
                  "data-ocid": "edit_game.remove_image_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                  },
                  className: "absolute bottom-2 right-2 px-3 py-1 rounded-md text-xs font-display font-semibold bg-background/80 hover:bg-background border border-border transition-smooth",
                  "data-ocid": "edit_game.replace_image_button",
                  children: "Replace"
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
                "data-ocid": "edit_game.image_dropzone",
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
                "data-ocid": "edit_game.image_upload_button"
              }
            ),
            errors.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive",
                "data-ocid": "edit_game.image.field_error",
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
                "data-ocid": "edit_game.submit_button",
                children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  uploadProgress > 0 && uploadProgress < 100 ? `Uploading ${uploadProgress}%…` : "Saving…"
                ] }) : "Save Changes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({
                  to: "/game/$id",
                  params: { id: game.id.toString() }
                }),
                "data-ocid": "edit_game.cancel_button",
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
  EditGamePage
};
