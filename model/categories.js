import {Http} from "../utils/http";

class Categories{
 roots
 subs
 async getAll(){
  const data = await Http.request({
   url: 'category/all',
  })
  this.roots = data.roots
  this.subs = data.subs
 }
 getRoots(){
  return this.roots
 }
 getSubsByRootId(rootId){
  return this.subs.filter(sub => sub.parent_id === rootId)
 }
}

export default Categories