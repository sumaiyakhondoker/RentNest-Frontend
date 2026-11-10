
import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@/lib/types";

type Props = {
  reviews: Review[];
};

const PropertyReviews =({
  reviews,
}: Props) =>{
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / totalReviews
      : 0;

  const sortedReviews = [...reviews].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-[25px] font-bold">
            Customer Reviews
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {totalReviews}{" "}
            {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>

        {totalReviews > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xl text-amber-500">
              ★
            </span>

            <span className="text-xl font-bold">
              {averageRating.toFixed(1)}
            </span>

            <span className="text-sm text-muted-foreground">
              / 5
            </span>
          </div>
        )}
      </div>

      {totalReviews === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <h3 className="font-semibold">
            No reviews yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            This property has not received any reviews.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sortedReviews.map((review) => (
            <Card
              key={review.id}
              className="rounded-xl py-0 shadow-none"
            >
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      Tenant Review
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <span
                    className="text-sm tracking-wider text-amber-500"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {"★".repeat(
                      Math.max(0, Math.min(5, review.rating))
                    )}
                    {"☆".repeat(
                      5 -
                        Math.max(
                          0,
                          Math.min(5, review.rating)
                        )
                    )}
                  </span>
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  {review.comment?.trim() ||
                    "No written comment provided."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}


export default PropertyReviews