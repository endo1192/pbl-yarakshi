import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import 'babylonjs-gui';
import { AdvancedDynamicTexture, Button, Control } from 'babylonjs-gui';

const BabylonScene = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    // シーンの初期化
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // canvas が null でないことを確認
    if (!canvas) {
      console.error("Canvas is null.");
      return; // 何もしない
    }

    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

    // カメラとライトを設定
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(3, 2, 0), scene);
    /*const camera = new BABYLON.ArcRotateCamera(
      "camera1",
      Math.PI / 2,
      Math.PI / 4,
      4,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );*/
    camera.attachControl(canvas, true);
    camera.inputs.addMouseWheel();
        
    camera.setTarget(BABYLON.Vector3.Zero());
   
    scene.collisionsEnabled = true;
 
    camera.checkCollisions = true;
        
    camera.ellipsoid = new BABYLON.Vector3(1,1,0.7);

    camera.applyGravity = true;

    camera.speed = 1.5;
    BABYLON.Engine.CollisionsEpsilon = 0.0001;
    camera.inertia = 0.8;

    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

    let isJumping = false;
        let jumpSpeed = 0.3;  
        let jumpHeight = 2.1;   
        //let initialYPosition = camera.position.y;  


        
        /*const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        
        const jumpButton = BABYLON.GUI.Button.CreateSimpleButton("jumpButton", "Jump");
        jumpButton.width = "150px";
        jumpButton.height = "40px";
        jumpButton.color = "white";
        jumpButton.background = "green";*/

        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const jumpButton = Button.CreateSimpleButton("jumpButton", "Jump");
        jumpButton.width = "150px";
        jumpButton.height = "40px";
        jumpButton.color = "white";
        jumpButton.background = "green";


        
        jumpButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        jumpButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        jumpButton.left = "-20px"; 
        jumpButton.top = "-20px"; 

        
        let jumpVelocity = 0; 

        jumpButton.onPointerUpObservable.add(() => {
            console.log("Jump button pressed");
            if (!isJumping) {
                isJumping = true;
                jumpVelocity = jumpSpeed; 
            }
        });

        
        scene.registerBeforeRender(() => {
            
            if (isJumping) {
                camera.position.y += jumpVelocity; 
                jumpVelocity -= 0.03; 
        
                
                if (camera.position.y <= jumpHeight) {
                    isJumping = false;
                    jumpVelocity = 0; 
                }
            }

            
            if (camera.position.y < 1) {
                camera.position.y = 1; 
                isJumping = false; 
                jumpVelocity = 0; 
            }


            
            const forward = camera.getFrontPosition(1).subtract(camera.position).normalize();
            const right = BABYLON.Vector3.Cross(forward, camera.upVector).normalize();

            
            const moveVector = forward.scale(-joystickDelta.y).add(right.scale(-joystickDelta.x));
            camera.cameraDirection.x += moveVector.x * camera.speed * engine.getDeltaTime() / 1000;
            camera.cameraDirection.z += moveVector.z * camera.speed * engine.getDeltaTime() / 1000;

            
            if (isJumping) {
                camera.position.addInPlace(moveVector.scale(camera.speed * engine.getDeltaTime() / 1000));
            }
        });

        advancedTexture.addControl(jumpButton);
        let joystickContainer = document.createElement("div") as HTMLDivElement;
        joystickContainer.style.position = "absolute";
        joystickContainer.style.left = "100px";
        joystickContainer.style.bottom = "100px";
        joystickContainer.style.width = "100px";
        joystickContainer.style.height = "100px";
        joystickContainer.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
        joystickContainer.style.borderRadius = "50%";
        document.body.appendChild(joystickContainer);

        let joystickPuck = document.createElement("div");
        joystickPuck.style.position = "absolute";
        joystickPuck.style.left = "40px";
        joystickPuck.style.top = "40px";
        joystickPuck.style.width = "20px";
        joystickPuck.style.height = "20px";
        joystickPuck.style.backgroundColor = "gray";
        joystickPuck.style.borderRadius = "50%";
        joystickContainer.appendChild(joystickPuck);

        let isDraggingJoystick = false;
        let initialTouchPoint = { x: 0, y: 0 };
        let joystickDelta = { x: 0, y: 0 };

        
        joystickContainer.addEventListener("pointerdown", (event) => {
            isDraggingJoystick = true;
            initialTouchPoint = { x: event.clientX, y: event.clientY };
            event.preventDefault(); 
        });
        

        
        joystickContainer.addEventListener("touchmove", (event) => {
            if (isDraggingJoystick) {
                const touch = event.touches[0]; 
                let deltaX = touch.clientX - initialTouchPoint.x;
                let deltaY = touch.clientY - initialTouchPoint.y;
                let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                let maxDistance = 50;

                
                if (distance > maxDistance) {
                    let angle = Math.atan2(deltaY, deltaX);
                    deltaX = Math.cos(angle) * maxDistance;
                    deltaY = Math.sin(angle) * maxDistance;
                }

                joystickPuck.style.left = `${50 + deltaX}px`;
                joystickPuck.style.top = `${50 + deltaY}px`;

                joystickDelta.x = deltaX / maxDistance;
                joystickDelta.y = deltaY / maxDistance;

                event.preventDefault(); 
            }
        });

        joystickContainer.addEventListener("touchend", () => {
            isDraggingJoystick = false;
            joystickPuck.style.left = "50px";
            joystickPuck.style.top = "50px";
            joystickDelta = { x: 0, y: 0 };
        });

        

        
        joystickContainer.addEventListener("pointermove", (event) => {
            if (isDraggingJoystick) {
                let deltaX = event.clientX - initialTouchPoint.x;
                let deltaY = event.clientY - initialTouchPoint.y;
                let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                let maxDistance = 50;  

                
                /*if (distance > maxDistance) {
                    let angle = Math.atan2(deltaY, deltaX);
                    deltaX = Math.cos(angle) * maxDistance;
                    deltaY = Math.sin(angle) * maxDistance;
                }*/

                
                let angle = Math.atan2(deltaY, deltaX);
                if (distance > maxDistance) {
                    deltaX = Math.cos(angle) * maxDistance;
                    deltaY = Math.sin(angle) * maxDistance;
                }

                
                joystickPuck.style.left = `${50 + deltaX}px`;
                joystickPuck.style.top = `${50 + deltaY}px`;

                
                joystickDelta.x = deltaX / maxDistance;
                joystickDelta.y = deltaY / maxDistance;

                
                //updateMovementDirection(joystickDelta);
            }
        });


        joystickContainer.addEventListener("pointerup", () => {
            isDraggingJoystick = false;
            joystickPuck.style.left = "50px";
            joystickPuck.style.top = "50px";
            joystickDelta = { x: 0, y: 0 };
        });

        
        let isRotatingCamera = false;
        let previousPointerPosition = { x: 0, y: 0 };

        canvas.addEventListener("pointerdown", (event) => {
            if (event.clientX > canvas.width / 2) {  
                isRotatingCamera = true;
                previousPointerPosition = { x: event.clientX, y: event.clientY };
            }
        });

        canvas.addEventListener("pointermove", (event) => {
            if (isRotatingCamera) {
                let deltaX = event.clientX - previousPointerPosition.x;
                let deltaY = event.clientY - previousPointerPosition.y;

                camera.rotation.y += deltaX * 0.002;
                camera.rotation.x += deltaY * 0.002;

                previousPointerPosition = { x: event.clientX, y: event.clientY };
            }
        });

        canvas.addEventListener("pointerup", () => {
            isRotatingCamera = false;
            console.log("pointer up");
        });

        
        scene.registerBeforeRender(() => {
            
            const forward = camera.getFrontPosition(1).subtract(camera.position).normalize();
            const right = BABYLON.Vector3.Cross(forward, camera.upVector).normalize();

            
            const moveVector = forward.scale(-joystickDelta.y).add(right.scale(-joystickDelta.x));

            camera.cameraDirection.x += moveVector.x * camera.speed * engine.getDeltaTime() / 1000;
            camera.cameraDirection.z += moveVector.z * camera.speed * engine.getDeltaTime() / 1000;
            
        });


        
        const stopJoystick = () => {
            if (isDraggingJoystick) {
                isDraggingJoystick = false;
                joystickPuck.style.left = "50px";
                joystickPuck.style.top = "50px";
                joystickDelta = { x: 0, y: 0 };
                console.log("Pointer up - Joystick stop");
            }
        };

        joystickContainer.addEventListener("touchend", stopJoystick);

        // Debugging logs
        document.addEventListener("pointerup", (e) => console.log("Pointer up - Document", e));
        //window.addEventListener("pointerup", (e) => console.log("Pointer up - Window", e));
        document.addEventListener("touchend", (e) => console.log("Touch end - Document", e));
        //window.addEventListener("touchend", (e) => console.log("Touch end - Window", e));

        
        joystickContainer.addEventListener("pointerup", (e) => {
            console.log("Pointer up - Joystick area", e);
        });

    // メッシュの読み込み
    let Cube = null;

    BABYLON.SceneLoader.ImportMeshAsync("", "./scene/", "sado5.glb", scene).then((result) => {
        result.meshes.forEach((mesh) => {
            console.log("Loaded mesh name:", mesh.name);
        });
        
        Cube = result.meshes.find(mesh => mesh.name === "Cube.132");
        if (!Cube) {
            console.error("Cube mesh not found in the loaded scene.");
        }

        for (let i = 1; i <= 6; i++) {
            const meshName = `coli.00${i}`;
            const mesh = result.meshes.find(mesh => mesh.name === meshName);
            if (mesh) {
                mesh.checkCollisions = true;
            }
        }
    });

    // シーンのレンダリング
    engine.runRenderLoop(() => {
      scene.render();
    });

    // ウィンドウサイズに応じたリサイズ対応
    window.addEventListener("resize", () => {
      engine.resize();
    });

    // クリーンアップ
    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default BabylonScene;
