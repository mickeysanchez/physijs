(function() {
    Physijs.scripts.ammo = '/js/vendor/ammo.js';
    Physijs.scripts.worker = '/js/vendor/physijs_worker.js';

    var initScene, render, renderer, scene, camera, box;

    initScene = function() {
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('bodyYa').appendChild(renderer.domElement);

        scene = new Physijs.Scene({
            fixedTimeStep: 1 / 60
        });
        scene.setGravity(new THREE.Vector3(0, -150, 0));

        camera = new THREE.OrthographicCamera(
            window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
        camera.position.set(0, 0, -100);
        camera.lookAt(scene.position);
        scene.add(camera);

        // Box
        NUM_BOXES = 5;
        for (var i = 0; i < NUM_BOXES; i++) {
            box = new Physijs.BoxMesh(
                new THREE.CubeGeometry(10, 10, 10),
                new THREE.MeshBasicMaterial({
                    color: 0x888888
                })
            );
            box.position.y += i * 20
            if (i % 2 == 0) {
                box.position.x += 3;
            } else {
                box.position.x -= 3;
            }
            scene.add(box);
        }

        box = new Physijs.BoxMesh(
            new THREE.CubeGeometry(10, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0x888888
            }),
            0
        );
        box.position.y -= 50;
        scene.add(box);

        requestAnimationFrame(render);
    };

    render = function() {
        scene.simulate(); // run physics
        renderer.render(scene, camera); // render the scene
        requestAnimationFrame(render);
    };

    window.onload = initScene();

})();
