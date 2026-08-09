import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./FlightListInfo.css";
const FlightListSkeleton = () => {
  return (
     <div className="container_loader2" id="Loader">
      {/* <div className="loader2"> <img src="/Content/img/loading-ban.gif" alt="loading" /> </div> */}
      <div className="loaderpp">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ '--i': i + 1 }} />
        ))}
        <div className="paperplane"></div>
      </div>
      <div className="loadtxtfl">
        Wings up! Scanning the skies for your perfect route.


      </div>
    </div>
    // <div>

    //   <div
    //     style={{
    //       padding: "10px 5px",
    //       boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    //     }}
    //   >
    //     <Row style={{ margin: "0px", padding: "0px" }}>
    //       <Skeleton />
    //       <div>
    //         <div className="d-flex gap-2 justify-content-between">
    //           {" "}
    //           <div className="d-flex gap-2 justify-content-between">
    //             <div className="extraSkeletionImage">
    //               <Skeleton className="extraSkeletionImage2" />
    //             </div>
    //             <div className="extraSkeleton4">
    //               <Skeleton width={70} />
    //               <Skeleton width={70} />
    //             </div>
    //           </div>
    //           <div>
    //             <Skeleton width={90} />
    //             <Skeleton width={90} />
    //           </div>
    //           <div className="text-center d-flex flex-row gap-2 extraSkeletion4">
    //             <div>
    //               <Skeleton width={70} />
    //               <div className="extraSkeletonImage4">
    //                 <Skeleton />
    //               </div>
    //               <Skeleton width={70} />
    //             </div>
    //             <div className="extraSkeletion3">
    //               <Skeleton width={90} />
    //               <Skeleton width={90} />
    //             </div>
    //           </div>
    //           <div className="extraSkeletion2">
    //             <Skeleton width={70} />
    //             <Skeleton width={100} height={20} />
    //             <Skeleton width={130} />
    //           </div>
    //           <div className="mt-3 extraSkeletoon">
    //             <Skeleton height={40} width={80} />
    //           </div>
    //         </div>
    //         <div className="mt-2 extraSkeleton5">
    //           <Skeleton />
    //         </div>
    //         <div className="mt-1">
    //           <Skeleton width={230} />
    //         </div>
    //         <div></div>
    //       </div>
    //     </Row>
    //   </div>
    // </div>
  );
};

export default FlightListSkeleton;
