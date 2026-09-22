"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Item={slug:string;title:string;category:string;summary:string};

export function CatalogSearchBox(){
  const router=useRouter();
  const [items,setItems]=useState<Item[]>([]);
  const [query,setQuery]=useState("");
  const [open,setOpen]=useState(false);

  useEffect(()=>{
    fetch("/api/catalog")
      .then(response=>response.ok?response.json():Promise.reject(new Error("catalog")))
      .then(data=>Array.isArray(data.services)&&setItems(data.services))
      .catch(()=>{});
  },[]);

  const matches=useMemo(()=>{
    const needle=query.trim().toLowerCase();
    if(needle.length<2) return [];
    return items.filter(item=>`${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(needle)).slice(0,8);
  },[items,query]);

  function choose(slug:string){
    setOpen(false);
    router.push(`/services/${slug}`);
  }

  function submit(event:FormEvent){
    event.preventDefault();
    if(matches[0]) choose(matches[0].slug);
    else if(query.trim()) router.push(`/services?search=${encodeURIComponent(query.trim())}`);
  }

  return <form className="catalog-search-live" onSubmit={submit}>
    <div className="search-box">
      <input
        aria-label="ابحث عن خدمة"
        value={query}
        onFocus={()=>setOpen(true)}
        onChange={event=>{setQuery(event.target.value);setOpen(true);}}
        placeholder="مثال: تقويم مكتبي 2027، مجلة مؤسسة، علب منتج، لوحة واجهة..."
      />
      <button type="submit">بحث</button>
    </div>
    {open&&matches.length?<div className="search-suggestions">
      {matches.map(item=><button type="button" key={item.slug} onClick={()=>choose(item.slug)}>
        <span>{item.category}</span>
        <strong>{item.title}</strong>
      </button>)}
    </div>:null}
  </form>;
}
