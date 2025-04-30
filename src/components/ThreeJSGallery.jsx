import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeJSGallery = ({ projects, onSelectProject }) => {
  const mountRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [camera, setCamera] = useState(null);
  const frameIdRef = useRef(null);
  const raycaster = useRef(new THREE.Raycaster()).current;
  const mouse = useRef(new THREE.Vector2()).current;
  const controlsRef = useRef(null);
  const githubIconsRef = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 1.6, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minDistance = 3;
    controls.maxDistance = 8;
    controls.target.set(0, 1.6, 0);
    controlsRef.current = controls;

    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const textureLoader = new THREE.TextureLoader();
    

    // 加载墙壁纹理
    const wallTexture = textureLoader.load("public/textures/wall.jpg");
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(3, 2);

    const wallMaterial = new THREE.MeshStandardMaterial({
      map: wallTexture,
      roughness: 0.8,
      metalness: 0.1,
    });

    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(12, 6, 0.2),
      wallMaterial
    );

    wall.position.set(0, 1.5, -0.5);
    wall.receiveShadow = true;
    scene.add(wall);

    const floorTexture = textureLoader.load("public/textures/floor.jpg");
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(8, 4);

    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.7,
      metalness: 0.1,
    });

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 10),
      floorMaterial
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (!scene || !projects?.length) return;
  
    // 清除旧画作
    paintings.forEach((p) => {
      p.parent?.remove(p);
      p.frame?.parent?.remove(p.frame);
    });
  
    const newPaintings = [];
  
    const w = 2, h = 2;
    const spacing = 0.5;
    const thickness = 0.08;
    const startX = -(projects.length * (w + spacing) - spacing) / 2 + w / 2;
  
    const textureLoader = new THREE.TextureLoader();
  
    const githubIcons = [];
  
    projects.forEach((project, i) => {
      // 画框
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(w + thickness * 2, h + thickness * 2, thickness),
        new THREE.MeshPhysicalMaterial({
          color: 0x3d2814,
          roughness: 0.5,
          metalness: 0.3,
          clearcoat: 0.8,
          clearcoatRoughness: 0.2,
        })
      );
      frame.castShadow = true;
  
      // 画布
      const imageTexture = textureLoader.load(project.cover);
      const painting = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshStandardMaterial({
          map: imageTexture,
          roughness: 0.5,
        })
      );
  
      // GitHub 图标
      const githubTexture = textureLoader.load("public/textures/github-mark.png");
      const iconSize = 0.3;
      const githubIcon = new THREE.Mesh(
        new THREE.PlaneGeometry(iconSize, iconSize),
        new THREE.MeshBasicMaterial({ map: githubTexture, transparent: true })
      );
      githubIcon.position.set(-w / 2 + 0.2, -h / 2 + 0.2, 0.01); // 相对于画
      githubIcon.userData = { type: 'github', url: project.github };
  
      painting.add(githubIcon); // ✅ 绑定图标为子元素
  
      // 布局
      const x = startX + i * (w + spacing);
      const y = 1.5;
      frame.position.set(x, y, -0.4);
      painting.position.set(x, y, -0.35);
  
      // 数据绑定
      painting.userData = { projectId: project.id };
      painting.frame = frame;
  
      // 添加到场景
      scene.add(frame, painting);
  
      // 存储引用
      newPaintings.push(painting);
      githubIcons.push(githubIcon); // 保留给点击用
    });
  
    setPaintings(newPaintings);
    githubIconsRef.current = githubIcons; // 点击时仍使用
  }, [scene, projects]);

  useEffect(() => {
    if (!scene || !camera || !renderer || !controlsRef.current) return;
  
    const animate = () => {
      controlsRef.current.update();
  
      paintings.forEach((p) => {
        const selected = p.userData.projectId === selectedPainting;
  
        // 设置目标位置（浮出 vs 原位）
        const targetZ = selected ? 2 : -0.35;
        const frameTargetZ = selected ? 1.95 : -0.4;
        const targetX = selected ? 0 : p.initialX ?? p.position.x;
  
        // 插值过渡动画
        p.position.z += (targetZ - p.position.z) * 0.1;
        p.frame.position.z += (frameTargetZ - p.frame.position.z) * 0.1;
  
        p.position.x += (targetX - p.position.x) * 0.1;
        p.frame.position.x += (targetX - p.frame.position.x) * 0.1;
      });
  
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
  
    animate();
  
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [scene, camera, renderer, paintings, selectedPainting]);

  useEffect(() => {
    if (!renderer || !camera || !paintings.length) return;
  
    const handleClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
  
      // 标准设备坐标（NDC）
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  
      raycaster.setFromCamera(mouse, camera);
  
      // ✅ 使用 flatMap 展开 painting 和其子元素（如 github icon）
      const intersects = raycaster.intersectObjects(
        paintings.flatMap(p => [p, ...p.children]),
        true // 递归检测子对象
      );
  
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
  
        // ✅ GitHub 图标点击跳转
        if (clickedObject.userData.type === 'github' && clickedObject.userData.url) {
          window.open(clickedObject.userData.url, '_blank');
          return;
        }
  
        // ✅ 正常点击画作逻辑
        const id = clickedObject.userData.projectId;
        const isSame = id === selectedPainting;
        setSelectedPainting(isSame ? null : id);
        onSelectProject(isSame ? null : id);
      }
    };
  
    renderer.domElement.addEventListener("click", handleClick);
  
    return () => {
      renderer.domElement.removeEventListener("click", handleClick);
    };
  }, [renderer, camera, paintings, raycaster, mouse, selectedPainting, onSelectProject]);

  
  return (
    <div
      ref={mountRef}
      className="w-full h-[500px] sm:h-[700px] md:h-[800px] rounded-lg"
      style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
    />
  );
};

export default ThreeJSGallery;
