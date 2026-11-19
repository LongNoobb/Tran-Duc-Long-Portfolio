"""Regenerate browser images from the untouched originals (requires Pillow)."""

from pathlib import Path
from PIL import Image, ImageOps


ASSETS = Path(__file__).resolve().parents[1] / "portfolio" / "asset"


def main():
    original_bytes = optimized_bytes = count = 0
    for source_path in ASSETS.rglob("*"):
        if not source_path.is_file() or source_path.suffix.lower() not in {".png", ".jpg"}:
            continue
        if "optimized" in source_path.relative_to(ASSETS).parts:
            continue
        target = ASSETS / "optimized" / source_path.relative_to(ASSETS).with_suffix(".webp")
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source_path) as source:
            has_alpha = source.mode in {"RGBA", "LA"} or "transparency" in source.info
            image = ImageOps.exif_transpose(source).convert("RGBA" if has_alpha else "RGB")
            is_small = (
                "icon" in source_path.stem
                or "avatar" in source_path.stem
                or source_path.parent.name == "games"
            )
            image.thumbnail((192, 192) if is_small else (1440, 1600), Image.Resampling.LANCZOS)
            image.save(target, "WEBP", quality=85, method=6)
        original_bytes += source_path.stat().st_size
        optimized_bytes += target.stat().st_size
        count += 1
    print(f"{count} images: {original_bytes:,} → {optimized_bytes:,} bytes "
          f"({100 * (1 - optimized_bytes / original_bytes):.1f}% smaller)")


if __name__ == "__main__":
    main()
