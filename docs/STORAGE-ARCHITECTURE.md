# ORYX Object Storage Architecture

Neon branchable object storage is enabled on the `preview` branch.

## Buckets

- `public-assets` — public service images, package covers, magazine visuals and approved marketing assets.
- `customer-documents` — private order files, briefs, customer uploads and administrative attachments.
- `design-files` — private design sources, proofs, versions and final approved production files.
- `project-assets` — private Projects Lab working documents, sponsor files and project production assets.

## Security rules

Public marketing assets and private operational/customer documents must never share the same bucket.

Browser uploads will use short-lived presigned URLs. The application will never expose storage credentials to the browser.

Every uploaded object must have a corresponding `documents` row containing owner, bucket, object key, MIME type, size and visibility.

Customer files are private by default. Downloads require authorization against the owning customer/order/project/partner context.

Design approval points to an exact immutable design version. A later upload cannot silently replace the file that was approved for production.

## Runtime connection

Do not create or store a long-lived storage credential in GitHub. A scoped runtime credential will be injected only when the deployment environment is connected. Use the minimum scopes required: `storage:read` and/or `storage:write`.
