-- ORYX branchable object storage metadata

alter table documents
  add column if not exists bucket_name text not null default 'customer-documents',
  add column if not exists access_level text not null default 'private'
    check (access_level in ('private','public_read')),
  add column if not exists purpose text,
  add column if not exists uploaded_by uuid references app_users(id) on delete set null;

create index if not exists idx_documents_bucket_key on documents(bucket_name,storage_key);
create index if not exists idx_documents_owner on documents(owner_type,owner_id);

create table if not exists storage_upload_sessions (
  id uuid primary key default gen_random_uuid(),
  bucket_name text not null,
  object_key text not null,
  owner_type text not null,
  owner_id uuid,
  file_name text not null,
  mime_type text,
  max_size_bytes bigint not null,
  status text not null default 'pending'
    check (status in ('pending','uploaded','verified','expired','rejected')),
  requested_by uuid references app_users(id) on delete set null,
  expires_at timestamptz not null,
  verified_document_id uuid references documents(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(bucket_name,object_key)
);

create index if not exists idx_storage_upload_sessions_status on storage_upload_sessions(status,expires_at);
