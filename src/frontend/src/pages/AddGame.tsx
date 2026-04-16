import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ImagePlus, Link2, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { useAuth } from "../hooks/use-auth";
import { useAddGameLink } from "../hooks/use-game-links";

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
  "fanatical.com",
];

function isAllowedStoreUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    return ALLOWED_STORES.some(
      (store) =>
        parsed.hostname === store || parsed.hostname.endsWith(`.${store}`),
    );
  } catch {
    return false;
  }
}

interface FormErrors {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

interface FormState {
  title: string;
  description: string;
  url: string;
}

const INITIAL_FORM: FormState = { title: "", description: "", url: "" };

function validate(form: FormState, imageFile: File | null): FormErrors {
  const errors: FormErrors = {};
  if (!form.title.trim()) errors.title = "Title is required";
  if (!form.description.trim()) errors.description = "Description is required";
  if (!form.url.trim()) {
    errors.url = "URL is required";
  } else if (!isAllowedStoreUrl(form.url.trim())) {
    errors.url =
      "Must be a link to an official store (Steam, Epic, itch.io, GOG, etc.)";
  }
  if (!imageFile) errors.image = "Cover image is required";
  return errors;
}

export function AddGamePage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const navigate = useNavigate();
  const addGame = useAddGameLink();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState | "image", boolean>>
  >({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      login();
    }
  }, [isAuthenticated, isInitializing, login]);

  const setField = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      const errs = validate({ ...form, [field]: value }, imageFile);
      setErrors((e) => ({ ...e, [field]: errs[field as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate(form, imageFile);
    setErrors((e) => ({ ...e, [field]: errs[field as keyof FormErrors] }));
  };

  const handleImageChange = useCallback((file: File | null) => {
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setErrors((e) => ({ ...e, image: undefined }));
    setTouched((t) => ({ ...t, image: true }));
  }, []);

  const handleFileDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0] ?? null;
    if (file?.type.startsWith("image/")) handleImageChange(file);
  };

  const removeImage = () => {
    handleImageChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form, imageFile);
    setErrors(errs);
    setTouched({ title: true, description: true, url: true, image: true });
    if (Object.keys(errs).length > 0) return;

    try {
      const bytes = new Uint8Array(await imageFile!.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });

      const result = await addGame.mutateAsync({
        title: form.title.trim(),
        description: form.description.trim(),
        url: form.url.trim(),
        image: blob,
      });

      toast.success("Game link added!");
      navigate({ to: "/game/$id", params: { id: result.id.toString() } });
    } catch {
      toast.error("Failed to add game link. Please try again.");
      setUploadProgress(0);
    }
  };

  if (isInitializing) {
    return (
      <div
        className="flex items-center justify-center py-24"
        data-ocid="add_game.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const isPending = addGame.isPending;

  return (
    <div
      className="container mx-auto px-4 py-10 max-w-2xl"
      data-ocid="add_game.page"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6"
        data-ocid="add_game.back_link"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Browse
      </Link>

      <div className="mb-8">
        <h1 className="font-display font-extrabold text-3xl text-foreground mb-2">
          Add a Game Link
        </h1>
        <p className="text-muted-foreground">
          Share a game from Steam, Epic Games, itch.io, GOG, or any official
          store.
        </p>
      </div>

      <Card className="p-6 bg-card border-border">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-display font-semibold">
              Game Title
            </Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              onBlur={() => handleBlur("title")}
              placeholder="e.g. Hollow Knight"
              className="bg-background border-input"
              data-ocid="add_game.title_input"
            />
            {errors.title && (
              <p
                className="text-sm text-destructive"
                data-ocid="add_game.title.field_error"
              >
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-display font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              placeholder="What's this game about? Why do you love it?"
              rows={4}
              className="bg-background border-input resize-none"
              data-ocid="add_game.description_input"
            />
            {errors.description && (
              <p
                className="text-sm text-destructive"
                data-ocid="add_game.description.field_error"
              >
                {errors.description}
              </p>
            )}
          </div>

          {/* Game URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="font-display font-semibold">
              Official Store Link
            </Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="url"
                type="url"
                value={form.url}
                onChange={(e) => setField("url", e.target.value)}
                onBlur={() => handleBlur("url")}
                placeholder="https://store.steampowered.com/app/..."
                className="pl-10 bg-background border-input"
                data-ocid="add_game.url_input"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Accepted: Steam, Epic Games, itch.io, GOG, Humble Bundle, Xbox,
              PlayStation, Nintendo, EA, Ubisoft, Battle.net
            </p>
            {errors.url && (
              <p
                className="text-sm text-destructive"
                data-ocid="add_game.url.field_error"
              >
                {errors.url}
              </p>
            )}
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label className="font-display font-semibold">Cover Image</Label>

            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-border aspect-video max-h-52">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 hover:bg-background flex items-center justify-center border border-border transition-smooth"
                  aria-label="Remove image"
                  data-ocid="add_game.remove_image_button"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {isPending && uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="w-full border-2 border-dashed border-input rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-smooth"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload cover image"
                data-ocid="add_game.image_dropzone"
              >
                <ImagePlus className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-display font-semibold text-foreground mb-1">
                  Drop image here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WEBP — max 10 MB
                </p>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                handleImageChange(file);
              }}
              data-ocid="add_game.image_upload_button"
            />
            {errors.image && (
              <p
                className="text-sm text-destructive"
                data-ocid="add_game.image.field_error"
              >
                {errors.image}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold gap-2 flex-1"
              data-ocid="add_game.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {uploadProgress > 0 && uploadProgress < 100
                    ? `Uploading ${uploadProgress}%…`
                    : "Saving…"}
                </>
              ) : (
                "Add Game Link"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/" })}
              data-ocid="add_game.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
