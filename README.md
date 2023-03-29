# Github find next patch release

## Usage

```yaml
- name: Get next release version
  id: next_release
  uses: martinsbalodis/ga-next-patch-release@master
  with:
    base_release: 0.1.0
    github_token: xxx
```

Use returned version:
```yaml
${{ steps.next_release.outputs.nextRelease }}
```

----
## Action Spec:

### Inputs
- `base_release` - Base release version without prefix. (0.1.0)
- `github_token` - Github token

### Outputs
- `nextRelease` - Next version without v prefix (0.1.1)
