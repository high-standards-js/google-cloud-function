const base = require('@high-standards-js/base');

(async() => {
    await base.checkAcceptedHighStandards();
    let packageJson = base.getInitiatingProjectPackageJson();

    packageJson['cloud-function'] = JSON.parse(base.getTemplate(__dirname, 'cloud-function.json'))
    
    const context = Object.assign({
        packageName: packageJson.name.replace(/^@.+\//, '')
    },
    packageJson['cloud-function']);
    
    base.writeFile(
        'cloudbuild.yaml',
        base.getTemplate(__dirname, 'cloudbuild.yaml', context)
    );
    
    base.writeInitiatingProjectPackageJson(packageJson);
})()