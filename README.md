# 3D-racing-three.js

A 3D racing game in a web browser, using Three.js, a WebGL library.

### Dependencies
- Three.js
- OrbitControls.js
- OBJLoader2.js (load 3D objects)
- MTLLoader.js (load material files)
- MtlObjBridge.js
- Parcel js bundler
- parcel-plugin-static-files-copy

### Features:
- Camera, Camera helper
- Lights
- Shadow
- Physics, gravity
- Player animation
- Skyboxes
- 3D models
- Object loader, Material loader


### To do:
- [x] Make one car obj for duplication, instead of a group of cars
- [x] Integrate the logic to select a winner 
- [x] Winner animation
- [x] Camera movement, follows players
- [x] Player names display
- [ ] Player elimination animation
- [ ] Art decorations, i.e. trees, pavement, sky

### Demo
Here's the [demo](https://3d-racing-three-js.vercel.app/).

To see this project locally, please run:
`npm run dev` or `parcel index.html --no-cache`
