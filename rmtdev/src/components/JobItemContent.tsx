import { useActiveId } from "../hooks/useActiveId";
import { useJobDetails } from "../hooks/useJobDetails";
import { JobDetails } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";

export default function JobItemContent() {
  const activeId = useActiveId();

  const [jobDetails, loading] = useJobDetails(activeId);

  return (
    <>
      <section className="job-details">
        {loading && <LoadingContent />}
        {jobDetails && !loading && <ContentJobItem jobDetails={jobDetails} />}
        {!jobDetails && !loading && <EmptyJobContent />}
      </section>
    </>
  );
}

function LoadingContent() {
  return (
    <div>
      <Spinner />
    </div>
  );
}

type ContentJobItemProps = {
  jobDetails: JobDetails;
};

function ContentJobItem({ jobDetails }: ContentJobItemProps) {
  return (
    <>
      <div>
        <img src={jobDetails.coverImgURL} alt="#" />

        <a className="apply-btn" href={jobDetails.companyURL} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{jobDetails.badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{jobDetails.daysAgo}d</time>

              <BookmarkIcon id={jobDetails.id} />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{jobDetails.title}</h2>
            <p className="job-info__company">{jobDetails.company}</p>
            <p className="job-info__description">{jobDetails.description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {jobDetails.duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {jobDetails.salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                {jobDetails.location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">
                Other qualifications may apply
              </p>
            </div>
            <ListQualifications qualifications={jobDetails.qualifications} />
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">
                Recent things people are saying
              </p>
            </div>
            <ListOfReviews reviews={jobDetails.reviews} />
          </section>
        </div>

        <footer className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{" "}
            <span className="u-bold">rmtDev</span>, we would really appreciate
            it!
          </p>
        </footer>
      </div>
    </>
  );
}

type QualificationsProps = {
  qualifications: string[];
};

function ListQualifications({ qualifications }: QualificationsProps) {
  return (
    <ul className="qualifications__list">
      {qualifications.map((qualification, index) => (
        <li className="qualifications__item" key={index}>
          {qualification}
        </li>
      ))}
    </ul>
  );
}

type ReviewsProps = {
  reviews: string[];
};

function ListOfReviews({ reviews }: ReviewsProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review, index) => (
        <li className="reviews__item" key={index}>
          {review}
        </li>
      ))}
    </ul>
  );
}

function EmptyJobContent() {
  return (
    <>
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </>
  );
}
