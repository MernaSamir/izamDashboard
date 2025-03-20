import { NavItem } from "@/components/Sidebar/types/sidebar";
import axios from "axios";

export const getNavItems = () =>axios.get("http://localhost:8081/nav")
export const saveSidebarItems =(navItems:NavItem[])=>axios.post("http://localhost:8081/nav", navItems)
export const trackItems=(id: number | null,
  from: unknown,
  to: unknown)=>{
    axios
    .post("http://localhost:8081/track", {
      id,
      from,
      to,
    })
}
