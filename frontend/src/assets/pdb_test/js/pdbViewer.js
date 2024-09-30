function switchColorScheme(viewerInstance, scheme) {
    if (scheme === "alphafold") {
        viewerInstance.coloring.applyAlphaFoldSync();
        document.getElementById("alphafold_score").style.display = "";
        document.getElementById("secstruc_index").style.display = "none";
    } else {
        viewerInstance.coloring.applySecondaryStructure();
        document.getElementById("alphafold_score").style.display = "none";
        document.getElementById("secstruc_index").style.display = "";		
    }
}

function pdbViewer(pdb) {
    console.log("Initializing viewer...");
    var viewerContainer = document.getElementById('pdbViewer');
    if (viewerContainer) {
        console.log("Viewer container found, initializing PDBeMolstar with PDB: ", pdb);
        var viewerInstance = new PDBeMolstarPlugin();
        var options = {
            customData: {
                url: pdb, format: 'pdb', binary: false
            },
            visualStyle: 'cartoon',
            bgColor: { r: 255, g: 255, b: 255 },
            hideControls: true
        };
        viewerInstance.render(viewerContainer, options);
        viewerInstance.events.loadComplete.subscribe(() => {
            console.log("Model loaded successfully.");
            viewerInstance.coloring.applyAlphaFold();
        });
        viewerInstance.events.loadError.subscribe(error => {
            console.error("Error loading model: ", error);
        });
    } else {
        console.error('Viewer container not found');
    }
}








async function asyncApplyAlphaFold(viewerInstance) {
    try {
        const result = await viewerInstance.coloring.applyAlphaFold();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
