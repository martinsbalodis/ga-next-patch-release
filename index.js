const core = require("@actions/core");
const Action = require("./action");
const github = require("@actions/github");

async function exec() {
    try {
        const githubToken = core.getInput("github_token", {required: true});
        const baseRelease = core.getInput("base_release", {required: true});
        const githubConfig = {
            owner: github.context.repo.owner,
            repo: github.context.repo.owner,
            token: githubToken,
        };

        const nextRelease = await new Action(githubConfig, baseRelease).getNextPatchRelease();
        core.setOutput("next_release", nextRelease);
    } catch (error) {
        core.setFailed(error);
    }
}

exec();
