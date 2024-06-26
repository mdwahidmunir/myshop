import { nanoid } from "nanoid";

function Rating({ value, color }) {
  const ratingThersholds = [0.5, 1.5, 2.5, 3.5, 4.5];
  return (
    <div className="raing">
      {ratingThersholds.map((rateThreshold) => (
        <span key={nanoid()}>
          <i
            style={{ color }}
            className={
              value >= rateThreshold + 0.5
                ? "fas fa-star"
                : value >= rateThreshold
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
      ))}
    </div>
  );
}

export default Rating;
