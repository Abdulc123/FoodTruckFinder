@"
## 2025-09-27 2:36 PM

- Fixed profile badge logic:
  - `first-bite` now awards correctly when a truck is visited.
  - `halal-helper` now awards when **Halal only** preference is enabled.
- Verified in browser:
  - Visited `truck-1` → showed `first-bite`.
  - Toggled Halal → showed `halal-helper`.
- Synced branch `Feature-Profile` with `dev`.
- Confirmed Profile UI updates dynamically with new badges.
"@ | Out-File -Encoding utf8 .\Eva.md
