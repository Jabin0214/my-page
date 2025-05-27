import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//HDRI
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const ThreeJSGallery = ({ sectionTitle, projects, onSelectProject }) => {
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
  const initialPositionsRef = useRef({});
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  const texturesRef = useRef({});

  const createTextTexture = (
    text,
    width = 1024,
    height = 256,
    fontSize = 64
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    //墙壁文字
    const ctx = canvas.getContext("2d");

    ctx.font = `bold ${fontSize}px Georgia`;

    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  // 预加载所有纹理
  useEffect(() => {
    if (!projects?.length) return;

    const texturesToLoad = [
      import.meta.env.BASE_URL + "textures/wall.jpg",
      import.meta.env.BASE_URL + "textures/floor.jpg",
      import.meta.env.BASE_URL + "textures/github-mark.png",
      ...projects.map((project) => project.cover),
    ];

    let loadedCount = 0;
    const textureLoader = textureLoaderRef.current;
    const loadedTextures = {};

    const updateLoadingProgress = () => {
      const progress = Math.round((loadedCount / texturesToLoad.length) * 100);
      setLoadingProgress(progress);
    };

    texturesToLoad.forEach((url) => {
      textureLoader.load(
        url,
        // 成功回调
        (texture) => {
          loadedTextures[url] = texture;
          loadedCount++;
          updateLoadingProgress();

          // 配置纹理属性
          if (url.includes("wall.jpg")) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(3, 2);
          } else if (url.includes("floor.jpg")) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(8, 4);
          }

          // 所有纹理加载完成
          if (loadedCount === texturesToLoad.length) {
            texturesRef.current = loadedTextures;
            setTexturesLoaded(true);
          }
        },
        // 进度回调
        (xhr) => {
          // 可以在这里实现更详细的进度显示
        },
        // 错误回调
        (error) => {
          console.error(`Error loading texture ${url}:`, error);
          loadedCount++;
          updateLoadingProgress();

          // 确保即使有些纹理加载失败，我们仍能继续
          if (loadedCount === texturesToLoad.length) {
            texturesRef.current = loadedTextures;
            setTexturesLoaded(true);
          }
        }
      );
    });

    return () => {
      // 清理纹理资源
      Object.values(texturesRef.current).forEach((texture) => {
        if (texture && texture.dispose) {
          texture.dispose();
        }
      });
    };
  }, [projects]);

  // 初始化场景、相机和渲染器
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();

    const loader = new RGBELoader();
    loader.load(import.meta.env.BASE_URL + "hdri/small_empty_room_2_4k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    });

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 1, 7);

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

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // 添加方向光以增强阴影
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

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
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  // 仅在纹理加载完成后创建场景对象
  useEffect(() => {
    if (!scene || !texturesLoaded) return;

    // 创建墙壁
    const wallTexture = texturesRef.current[import.meta.env.BASE_URL + "textures/wall.jpg"];
    if (wallTexture) {
      const wallMaterial = new THREE.MeshPhysicalMaterial({
        map: wallTexture,
        roughness: 0.5,
        metalness: 0.3,
        envMapIntensity: 0.8, // ✅ 让 HDRI 发挥作用
      });

      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(12, 6, 0.2),
        wallMaterial
      );

      wall.position.set(0, 1.5, -0.5);
      wall.receiveShadow = true;
      scene.add(wall);
    }

    const wallTitleTexture = createTextTexture(sectionTitle, 1024, 256, 64);
    const wallTitleMaterial = new THREE.MeshBasicMaterial({
      map: wallTitleTexture,
      transparent: true,
    });
    const wallTitleMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 1.5),
      wallTitleMaterial
    );
    wallTitleMesh.position.set(0, 3.5, -0.35); // 贴近墙顶
    scene.add(wallTitleMesh);

    // 创建地板
    const floorTexture = texturesRef.current[import.meta.env.BASE_URL + "textures/floor.jpg"];
    if (floorTexture) {
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
      scene.add(floor);
    }
  }, [scene, texturesLoaded]);

  // 创建画作，仅在纹理加载完成后执行
  useEffect(() => {
    if (!scene || !projects?.length || !texturesLoaded) return;

    // 清除旧画作
    paintings.forEach((p) => {
      if (p.parent) {
        p.parent.remove(p);
      }
      if (p.frame?.parent) {
        p.frame.parent.remove(p.frame);
      }
    });

    const newPaintings = [];
    const initialPositions = {};

    const w = 2,
      h = 2;
    const spacing = 0.5;
    const thickness = 0.08;
    const startX = -(projects.length * (w + spacing) - spacing) / 2 + w / 2;

    projects.forEach((project, i) => {
      // 画框
      const frameGeometry = new THREE.BoxGeometry(
        w + thickness * 2,
        h + thickness * 2,
        thickness
      );
      const frameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x3d2814,
        roughness: 0.5,
        metalness: 0.3,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.castShadow = true;

      // 画布 - 使用预加载的纹理
      const imageTexture = texturesRef.current[project.cover];
      if (!imageTexture) {
        console.warn(`Texture not found for ${project.cover}`);
        return; // 跳过此画作
      }

      const paintingMaterial = new THREE.MeshStandardMaterial({
        map: imageTexture,
        roughness: 0.5,
      });
      const painting = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        paintingMaterial
      );

      // GitHub 图标 - 使用预加载的纹理
      const githubTexture =
        texturesRef.current[import.meta.env.BASE_URL + "textures/github-mark.png"];
      if (githubTexture) {
        const iconSize = 0.25;
        const githubIconMaterial = new THREE.MeshBasicMaterial({
          map: githubTexture,
          transparent: true,
          alphaTest: 0.5,
        });
        const githubIcon = new THREE.Mesh(
          new THREE.PlaneGeometry(iconSize, iconSize),
          githubIconMaterial
        );
        githubIcon.position.set(-w / 2 + 0.15, -h / 2 + 0.15, 0.01);
        githubIcon.userData = {
          type: "github",
          url: project.github,
          projectId: project.id,
        };
        painting.add(githubIcon);
      }

      // 布局
      const x = startX + i * (w + spacing);
      const y = 1.5;
      frame.position.set(x, y, -0.4);
      painting.position.set(x, y, -0.35);

      // 存储初始位置
      initialPositions[project.id] = {
        paintingX: x,
        paintingY: y,
        paintingZ: -0.35,
        frameX: x,
        frameY: y,
        frameZ: -0.4,
      };

      // 数据绑定
      painting.userData = { projectId: project.id };
      painting.frame = frame;

      // 添加到场景
      scene.add(frame);
      scene.add(painting);

      // 存储引用
      newPaintings.push(painting);
    });

    setPaintings(newPaintings);
    initialPositionsRef.current = initialPositions;
  }, [scene, projects, texturesLoaded]);

  // 动画更新
  useEffect(() => {
    if (!scene || !camera || !renderer || !controlsRef.current) return;

    const animate = () => {
      controlsRef.current.update();

      paintings.forEach((p) => {
        if (!p || !p.userData) return;

        const selected = p.userData.projectId === selectedPainting;
        const initialPos = initialPositionsRef.current[p.userData.projectId];
        if (!initialPos) return;

        // 设置目标位置
        let targetX, targetZ, frameTargetZ;

        if (selected) {
          // 被选中的画向前移
          targetX = 0; // 中心位置
          targetZ = 0.5; // 向前移动
          frameTargetZ = 0.45; // 画框略微靠后
        } else {
          // 未选中的画返回原位
          targetX = initialPos.paintingX;
          targetZ = initialPos.paintingZ;
          frameTargetZ = initialPos.frameZ;
        }

        // 平滑动画
        const speed = 0.08;

        p.position.x += (targetX - p.position.x) * speed;
        p.position.z += (targetZ - p.position.z) * speed;

        //放大
        if (selected) {
          p.scale.set(1.5, 1.5, 1.5);
        } else {
          p.scale.set(1, 1, 1);
        }

        if (p.frame) {
          p.frame.position.x += (targetX - p.frame.position.x) * speed;
          p.frame.position.z += (frameTargetZ - p.frame.position.z) * speed;
        }
      });

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [scene, camera, renderer, paintings, selectedPainting]);

  // 点击事件处理
  useEffect(() => {
    if (!renderer || !camera || !paintings.length || !texturesLoaded) return;

    const handleClick = (e) => {
      // 防止连续快速点击
      e.preventDefault();

      const rect = renderer.domElement.getBoundingClientRect();

      // 计算标准设备坐标
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // 收集所有可点击对象
      const clickableObjects = paintings.flatMap((p) => [p, ...p.children]);
      const intersects = raycaster.intersectObjects(clickableObjects, true);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // 处理GitHub图标点击
        if (
          clickedObject.userData.type === "github" &&
          clickedObject.userData.url
        ) {
          window.open(clickedObject.userData.url, "_blank");
          return;
        }

        // 处理画作点击
        let projectId;

        // 获取项目ID，无论是从画作本身还是其父对象
        if (clickedObject.userData.projectId) {
          projectId = clickedObject.userData.projectId;
        } else if (
          clickedObject.parent &&
          clickedObject.parent.userData.projectId
        ) {
          projectId = clickedObject.parent.userData.projectId;
        }

        if (projectId) {
          const isSame = projectId === selectedPainting;
          setSelectedPainting(isSame ? null : projectId);
          onSelectProject && onSelectProject(isSame ? null : projectId);
        }
      }
    };

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const clickableObjects = paintings.flatMap((p) => [p, ...p.children]);
      const intersects = raycaster.intersectObjects(clickableObjects, true);

      // 更改鼠标样式
      renderer.domElement.style.cursor =
        intersects.length > 0 ? "pointer" : "default";
    };

    renderer.domElement.addEventListener("click", handleClick);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
    };
  }, [
    renderer,
    camera,
    paintings,
    raycaster,
    mouse,
    selectedPainting,
    onSelectProject,
    texturesLoaded,
  ]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[500px] sm:h-[700px] md:h-[800px] rounded-lg relative"
      style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
    >
      {!texturesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 rounded-lg z-10">
          <div className="text-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-2 text-gray-700">Loading... {loadingProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeJSGallery;
