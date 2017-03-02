var THREE = require("three");

function GridCube() {

    var container, camera, scene, controls, crt, renderer, stats;
    var objects = [];
    var cubeGeometry1 = new THREE.BoxGeometry(50, 50, 3);
    var cubeGeometry2 = new THREE.BoxGeometry(3, 50, 50);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x0000DD, overdraw: 0.5});
    var CANVAS_WIDTH = window.innerWidth;
    var CANVAS_HEIGHT = window.innerHeight;
    var side = false;

    this.loadScene = {

        material: function () {
            /*
             var success = function (response) {
             console.log(response.data);

             };

             var error = function (reason) {
             console.log(reason);
             };
             materialLookup.lookupAllMaterials().then(success, error);
             */
        },
        grid: function (gridSize, gridStep) {
            //var size = 500, step = 50;
            var objects = [];
            var geometry = new THREE.Geometry();
            for (var i = -gridSize; i <= gridSize; i += gridStep) {
                geometry.vertices.push(new THREE.Vector3(-gridSize, 0, i));
                geometry.vertices.push(new THREE.Vector3(gridSize, 0, i));
                geometry.vertices.push(new THREE.Vector3(i, 0, -gridSize));
                geometry.vertices.push(new THREE.Vector3(i, 0, gridSize));
            }
            var material = new THREE.LineBasicMaterial({color: 0x6c6c6c, opacity: 0.4});
            var line = new THREE.LineSegments(geometry, material);
            scene.add(line);
            var geometry = new THREE.PlaneBufferGeometry(2000, 2000);
            geometry.rotateX(-Math.PI / 2);
            var plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false}));
            scene.add(plane);
            objects.push(plane);

            return objects;
        },
        status: function () {
            var stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            return stats;
        },
        loadRender: function () {
            var renderer = new THREE.CanvasRenderer();
            renderer.setClearColor(0xf0f0f0);
            renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT, false);
            //renderer.domElement.style.width = "100%";
            //renderer.domElement.style.height = "100%";
            return renderer;
        },
        controllers: function () {
            var crt = {
                mouse: new THREE.Vector2(),
                rayCaster: new THREE.Raycaster(),
                controls: new THREE.OrbitControls(camera, renderer.domElement)
            }

            crt.controls.target.set(0, 12, 0);
            crt.controls.enableRotate = true;
            camera.position.set(-3.9765980931222633, 404.81378525006556, 708.8526010627781);
            camera.rotateY = 25;
            return crt;
        },
        lights: function () {

            var ambientLight = new THREE.AmbientLight(0x606060);
            scene.add(ambientLight);

            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.x = Math.random() - 0.5;
            directionalLight.position.y = Math.random() - 0.5;
            directionalLight.position.z = Math.random() - 0.5;
            directionalLight.position.normalize();
            scene.add(directionalLight);

            var directionalLight = new THREE.DirectionalLight(0x808080);
            directionalLight.position.x = Math.random() - 0.5;
            directionalLight.position.y = Math.random() - 0.5;
            directionalLight.position.z = Math.random() - 0.5;
            directionalLight.position.normalize();
            scene.add(directionalLight);
        },
        updateScene: function () {
            renderer.render(scene, camera);
        },
        animate: function () {
            requestAnimationFrame(this.animate.bind(this));
            stats.update();
            this.updateScene();
        },
        init: function () {

            container = $("three_container");
            camera = new THREE.PerspectiveCamera(60, ((CANVAS_WIDTH / CANVAS_HEIGHT)), 1, 2000);
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, ((CANVAS_WIDTH / CANVAS_HEIGHT)), 1, 2000);

            objects = this.grid(500, 50);
            //stats = this.status();
            //container.appendChild(stats.domElement);
            renderer = this.loadRender();
            container.appendChild(renderer.domElement);
            crt = this.controllers();
            crt.controls.update();
            this.lights();

            document.addEventListener('mousedown', this.onDocumentMouseDown, false);
            document.addEventListener('keydown', this.onDocumentKeyDown, false);
            document.addEventListener('keyup', this.onDocumentKeyUp, false);
            this.animate();
        },
        onDocumentKeyDown: function (event) {
            if (event.keyCode == 16 && crt.controls.enableRotate) {
                crt.controls.enableRotate = false;
            }
        },
        onDocumentKeyUp: function (event) {
            if (event.keyCode == 16 && !crt.controls.enableRotate) {
                crt.controls.enableRotate = true;
            }
        },
        onDocumentMouseDown: function (event) {

            if (event.button == 0 && !crt.controls.enableRotate) {
                event.preventDefault();

                crt.mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
                crt.mouse.y = -( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
                crt.rayCaster.setFromCamera(crt.mouse, camera);
                var intersects = crt.rayCaster.intersectObjects(objects);

                if (intersects.length > 0) {

                    var intersect = intersects[0];
                    var voxel;
                    if (side) {
                        voxel = new THREE.Mesh(cubeGeometry1, cubeMaterial);
                    } else {
                        voxel = new THREE.Mesh(cubeGeometry2, cubeMaterial);
                    }
                    voxel.position.copy(intersect.point).add(intersect.face.normal);
                    voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

                    scene.add(voxel);
                    objects.push(voxel);

                    this.updateScene();
                }
            }
        }
    };
}