const Action = require("../action");


test(`Should get newest unreleased release`, async () => {
    const action = new Action({owner: "martinsbalodis", repo: "ga-next-patch-release", token: ""}, "100.300.0");
    const version = await action.getNextPatchRelease();

    expect(version).toBe("100.300.0");
})
