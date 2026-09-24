import Link from "next/link";
import { createContentPostAction } from "../actions";

export default function NewContentPostPage(){
  return <main className="content-editor-page">
    <section className="content-editor-head">
      <div>
        <Link href="/admin/content">المجلة ←</Link>
        <span className="eyebrow">NEW ARTICLE</span>
        <h1>مقال جديد</h1>
        <p>ابدأ بالعنوان والـSlug، ثم افتح المحرر الكامل.</p>
      </div>
    </section>

    <form action={createContentPostAction} className="content-editor-form compact">
      <label>عنوان المقال<input name="title" required minLength={4} placeholder="مثال: كيف تختار خامة علبة المنتج؟"/></label>
      <label>Slug<input name="slug" required pattern="[a-z0-9-]+" placeholder="product-box-material-guide" dir="ltr"/></label>
      <button className="primary-button" type="submit">إنشاء المسودة</button>
    </form>
  </main>;
}
