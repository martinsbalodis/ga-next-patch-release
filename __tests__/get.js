const Action = require("../action");

test(`Version not found should tag current version`, async () => {
    const action = new Action({owner: "martinsbalodis", repo: "ga-next-patch-release"}, "100.300.0");
    const version = await action.getNextPatchRelease();

    expect(version).toBe("100.300.0");
})

test(`Version found should increase patch version`, async () => {
    const action = new Action({owner: "martinsbalodis", repo: "ga-next-patch-release"}, "0.1.0");
    const version = await action.getNextPatchRelease();

    expect(version).toBe("0.1.5");
})
