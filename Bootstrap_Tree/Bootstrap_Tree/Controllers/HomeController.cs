using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bootstrap_Tree.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Tree1()
        {
            return View();
        }

        public ActionResult zTree()
        {
            return View();
        }

        //返回tree的节点数据
        public JsonResult GetTreeData()
        {
            var lstRes = GetNode(1);
            return Json(lstRes, JsonRequestBehavior.AllowGet);
        }


        public List<Tree> GetNode(int iNum)
        {
            var lstRes = new List<Tree>();
            if (iNum > 5)
            {
                return lstRes;
            }
            for (var i = 1; i < 3; i++)
            {
                var oNode = new Tree { id = Guid.NewGuid().ToString(), text = iNum + "级节点" + i };
                var lstRes2 = GetNode(iNum + 1);
                oNode.nodes = lstRes2;
                lstRes.Add(oNode);
            }
            return lstRes;
        }
       
    }

    public class Tree
    {
        public string id { get; set; }

        public string text { get; set; }

        public object nodes { get; set; }
    }
}