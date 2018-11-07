"use strict";


d3.json("data/data.json", function(json) {
    console.log("Reading JSON")
    // console.log(json[0])
    // console.log(json[0].xPos)
    var count = 0;

    console.log(count + "Records processed");


    var width = 900
    var height = width * 0.85;
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    camera.position.set(0,2,20);
    camera.lookAt(0,55,0);

    var light = new THREE.DirectionalLight( 0xffffff, 1.5);
    // Position the light out from the scene, pointing at the origin
    light.position.set(0,2,20);
    light.lookAt(0,0,0);
    camera.add(light);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer();

    // set the size and append it to the document
    renderer.setSize( width, height );
    document.getElementById("scene").appendChild( renderer.domElement );


    var vectors = []
    var m = new THREE.PointsMaterial({
        vertexColors: THREE.VertexColors,
        size: 0.2
    });
    var g = new THREE.Geometry();
    var pointCloud =THREE.Points();
    for(var i=0;i<json.length;i++) {
        g.vertices.push(new THREE.Vector3(json[i].xPos[0], json[i].yPos[0], json[i].zPos[0]));
        vectors.push(new THREE.Vector3(json[i].xPos[0], json[i].yPos[0], json[i].zPos[0]));
        if(json[i].label[0] == 1)
            g.colors.push(new THREE.Color("rgb(49,130,189)"))
        if(json[i].label[0] == 3)
            g.colors.push(new THREE.Color("rgb(189,189,189)"))
        else
            g.colors.push(new THREE.Color("rgb(227,74,51)"))

    }
    pointCloud = new THREE.Points(g, m);
    pointCloud.name = 'shanksCloud';
    scene.add(pointCloud);




    var myOptions = new THREE.OrbitControls(camera, renderer.domElement);
    myOptions.enablePan = false;
    myOptions.update();
    // new THREE.ObjectControls(App.scene.getCamera(), App.scene.getRenderer().domElement, App.scene.getScene("shanksGroup"));

    // render the scene
    render();

    function render() {
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }

})