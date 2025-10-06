import Count from "@/components/common/Count";

interface DataType {
   id: number;
   count: number;
   count_text: string;
   text: string;
}[];

const count_data: DataType[] = [
   {
      id: 1,
      count: 45,
      count_text: "K+",
      text: "Active Students",
   },
   {
      id: 2,
      count: 89,
      count_text: "+",
      text: "Faculty Courses",
   },
   {
      id: 3,
      count: 156,
      count_text: "K",
      text: "Best Professors",
   },
   {
      id: 4,
      count: 42,
      count_text: "K",
      text: "Award Achieved",
   },
];

const Counter = () => {
   return (
      <section className="fact__area mb-5">
         <div className="container">
            <div
               className="fact__inner-wrap"
               style={{
                  background: "#230908",
                  borderRadius: "24px",
                  padding: "48px 0",
               }}
            >
               <div className="row">
                  {count_data.map((item) => (
                     <div key={item.id} className="col-lg-3 col-6">
                        <div className="fact__item">
                           <h2 className="count" style={{color: "#FFD600" }}>
                              <Count number={item.count} />
                              {item.count_text}
                           </h2>
                           <p style={{ color: "#fff", fontWeight: 500 }}>{item.text}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default Counter
