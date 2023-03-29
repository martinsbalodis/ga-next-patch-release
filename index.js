const core = require("@actions/core");
const Action = require("./action");
const github = require("@actions/github");

async function exec() {
    try {
        const githubToken = core.getInput("github_token", {required: true});
        const baseRelease = core.getInput("base_release", {required: true});
        const githubConfig = {
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            token: githubToken,
        };

        const nextRelease = await new Action(githubConfig, baseRelease).getNextPatchRelease();
        core.setOutput("nextRelease", nextRelease);
    } catch (error) {
        core.setFailed(error);
    }
}

exec();
