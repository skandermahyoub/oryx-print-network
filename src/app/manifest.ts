import type { MetadataRoute } from "next";

export default function manifest():MetadataRoute.Manifest{
  return {
    name:"ORYX Print Network",
    short_name:"ORYX",
    description:"منصة أوريكس الرقمية للتصميم والطباعة والإعلان والتصنيع حسب الطلب.",
    start_url:"/",
    display:"standalone",
    background_color:"#f6f3ee",
    theme_color:"#111111",
    orientation:"portrait-primary",
    lang:"ar",
    dir:"rtl",
    categories:["business","productivity","shopping"]
  };
}
