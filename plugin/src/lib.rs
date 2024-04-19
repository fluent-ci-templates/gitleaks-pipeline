use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn setup() -> FnResult<String> {
    let stdout = dag()
        .pipeline("setup")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "gitleaks"])?
        .with_exec(vec!["gitleaks", "version"])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn detect(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("detect")?
        .pkgx()?
        .with_exec(vec!["pkgx", "gitleaks", "detect", &args])?
        .stdout()?;
    Ok(stdout)
}
