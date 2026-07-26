from PIL import Image
import numpy as np

src = r"C:\Users\pranj\Downloads\PK183_LOGO.png"
dst = r"C:\Users\pranj\Downloads\MY LIFE\content-prod\public\PK183_LOGO.png"

img = Image.open(src).convert("RGBA")
arr = np.array(img)

# The logo has a dark/near-black background in most areas.
# We need to find where the logo has meaningful alpha (>10) AND brightness.
# Look at alpha channel for non-zero content
alpha = arr[:, :, 3]
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

# Find pixels that are either:
# - Alpha > 20 AND brightness > 30 (visible content)
brightness = r.astype(int) + g.astype(int) + b.astype(int)
mask = (alpha > 20) & (brightness > 60)

rows = np.any(mask, axis=1)
cols = np.any(mask, axis=0)
rmin, rmax = np.where(rows)[0][[0, -1]]
cmin, cmax = np.where(cols)[0][[0, -1]]

print(f"Original size   : {img.size}")
print(f"Content rows    : {rmin}–{rmax} (height {rmax-rmin})")
print(f"Content cols    : {cmin}–{cmax} (width  {cmax-cmin})")

# Add 8px breathing room
pad = 8
left   = max(0, cmin - pad)
top    = max(0, rmin - pad)
right  = min(img.width,  cmax + pad)
bottom = min(img.height, rmax + pad)

cropped = img.crop((left, top, right, bottom))
print(f"Cropped size    : {cropped.size}")

cropped.save(dst, "PNG", optimize=True)
print(f"Saved: {dst}")
