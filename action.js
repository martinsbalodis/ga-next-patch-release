const {Octokit} = require("@octokit/rest");
const {cmpTags} = require("tag-cmp");
module.exports = class {
    constructor(githubConfig, baseRelease) {
        this.githubConfig = githubConfig;
        this.octokit = new Octokit({auth: this.githubConfig.token});
        this.baseRelease = baseRelease;
    }

    async getNextPatchRelease() {
        const releaseWithoutPatch = this.baseRelease.slice(0, this.baseRelease.lastIndexOf("."));
        const prefix = "v" + releaseWithoutPatch + ".";
        const latestTag = await this.getLatestTag(prefix);

        if (latestTag === undefined) {
            return `${releaseWithoutPatch}.0`;
        }

        const latestPatchVersion = parseInt(new RegExp("([^.]+$)", "g").exec(latestTag)[0]);
        const nextPatchVersion = latestPatchVersion + 1;

        return `${releaseWithoutPatch}.${nextPatchVersion}`;
    }

    async getLatestTag(prefix) {
        const endpoint = this.octokit.repos.listTags;
        const pages = endpoint.endpoint.merge({"owner": this.githubConfig.owner, "repo": this.githubConfig.repo, "per_page": 100});

        const tags = [];
        for await (const item of this.getItemsFromPages(pages)) {
            const tag = item["name"];
            if (!tag.startsWith(prefix)) {
                continue;
            }
            tags.push(tag);
        }
        if (tags.length === 0) {
            return undefined;
        }
        tags.sort(cmpTags);
        const [latestTag] = tags.slice(-1);
        return latestTag;
    }

    async* getItemsFromPages(pages) {
        for await (const page of this.octokit.paginate.iterator(pages)) {
            for (const item of page.data) {
                yield item;
            }
        }
    }
};
