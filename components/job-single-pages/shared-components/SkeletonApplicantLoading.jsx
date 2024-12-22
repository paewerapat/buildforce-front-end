import React from "react";

function SkeletonApplicantLoading({ t }) {
  return (
    <button
      type="button"
      className={`theme-btn btn-style-nine`}
      data-bs-toggle="modal"
      data-bs-target="#applyJobModal"
      disabled
    >
      {t('Apply For Job')}
    </button>
  );
}

export default SkeletonApplicantLoading;
