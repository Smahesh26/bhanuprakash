import Link from "next/link";

const categories_data: string[] = ["Anatomy", "Physiology", "Oncology", "Pathology", "Medicine", "Nursing", "Pharmacology"];

const Categories = () => {
   return (
      <div className="blog-widget">
         <h4 className="widget-title">Categories</h4>
         <div className="shop-cat-list">
            <ul className="list-wrap">
               {categories_data.map((cat, i) => (
                  <li key={i}>
                     <Link href="#"><i className="flaticon-angle-right"></i>{cat}</Link>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default Categories
