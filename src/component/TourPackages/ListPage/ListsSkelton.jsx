import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListsSkelton = () => {
    return (
        <div className="tour-card-premium" style={{ border: '1px solid #f0f0f0' }}>
            {/* Image Skeleton */}
            <div className="card-img-box">
                <Skeleton height={220} width="100%" />
            </div>

            {/* Content Skeleton */}
            <div className="card-body-premium">
                <div className="card-meta-top">
                    <Skeleton width={80} height={15} />
                    <Skeleton width={100} height={15} />
                </div>

                <div className="card-title-premium">
                    <Skeleton count={2} />
                </div>

                <div className="card-info-row">
                    <Skeleton width={60} height={12} />
                    <Skeleton width={60} height={12} />
                </div>

                <div className="card-footer-premium">
                    <div className="price-wrap-premium">
                        <Skeleton width={40} height={10} />
                        <Skeleton width={100} height={20} />
                    </div>
                    <Skeleton circle width={32} height={32} />
                </div>
            </div>
        </div>
    );
};

export default ListsSkelton;