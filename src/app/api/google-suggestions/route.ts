import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const primaryQuery = searchParams.get("primaryQuery");
    const secondaryQuery = searchParams.get("secondaryQuery");

    if (!primaryQuery || !secondaryQuery) {
      return NextResponse.json(
        { error: "Both primary and secondary query parameters are required" },
        { status: 400 }
      );
    }

    // Clean the queries
    const cleanPrimaryQuery = primaryQuery.trim().toLowerCase();
    const cleanSecondaryQuery = secondaryQuery.trim().toLowerCase();

    // Generate variations for primary query
    const primaryVariations = [
      cleanPrimaryQuery,
      `${cleanPrimaryQuery} for`,
      `${cleanPrimaryQuery} how`,
      `${cleanPrimaryQuery} what`,
      `best ${cleanPrimaryQuery}`,
      `${cleanPrimaryQuery} guide`,
    ];

    // Generate variations for secondary query
    const secondaryVariations = [
      cleanSecondaryQuery,
      `${cleanSecondaryQuery} for`,
      `${cleanSecondaryQuery} how`,
      `${cleanSecondaryQuery} what`,
      `best ${cleanSecondaryQuery}`,
      `${cleanSecondaryQuery} guide`,
    ];

    // Fetch suggestions for primary keywords
    const primarySuggestionsPromises = primaryVariations.map(
      async (variation) => {
        try {
          const response = await fetch(
            `http://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
              variation
            )}`,
            {
              headers: {
                "User-Agent": "Mozilla/5.0",
              },
            }
          );
          const data = await response.json();
          return data[1] || [];
        } catch (error) {
          console.error(
            `Error fetching suggestions for "${variation}":`,
            error
          );
          return [];
        }
      }
    );

    // Fetch suggestions for secondary keywords
    const secondarySuggestionsPromises = secondaryVariations.map(
      async (variation) => {
        try {
          const response = await fetch(
            `http://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
              variation
            )}`,
            {
              headers: {
                "User-Agent": "Mozilla/5.0",
              },
            }
          );
          const data = await response.json();
          return data[1] || [];
        } catch (error) {
          console.error(
            `Error fetching suggestions for "${variation}":`,
            error
          );
          return [];
        }
      }
    );

    const [primaryArrays, secondaryArrays] = await Promise.all([
      Promise.all(primarySuggestionsPromises),
      Promise.all(secondarySuggestionsPromises),
    ]);

    // Process primary keyword suggestions
    const primarySuggestions = [...new Set(primaryArrays.flat())]
      .filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(cleanPrimaryQuery.toLowerCase()) &&
          suggestion.length >= 5 &&
          suggestion.split(" ").length >= 3
      )
      .slice(0, 3);

    // Process secondary keyword suggestions
    const secondarySuggestions = [...new Set(secondaryArrays.flat())]
      .filter(
        (suggestion) =>
          suggestion
            .toLowerCase()
            .includes(cleanSecondaryQuery.toLowerCase()) &&
          suggestion.length >= 3
      )
      .slice(0, 3);

    // If we don't have enough secondary suggestions, try to generate some
    if (secondarySuggestions.length < 3) {
      const additionalSuggestions = [
        `${cleanSecondaryQuery} tips`,
        `${cleanSecondaryQuery} guide`,
        `${cleanSecondaryQuery} tutorial`,
        `${cleanSecondaryQuery} examples`,
        `${cleanSecondaryQuery} basics`,
        `${cleanSecondaryQuery} for beginners`,
        `${cleanSecondaryQuery} meaning`,
        `${cleanSecondaryQuery} definition`,
        `${cleanSecondaryQuery} explained`,
        `${cleanSecondaryQuery} overview`,
      ]
        .filter((suggestion) => !secondarySuggestions.includes(suggestion))
        .slice(0, 3 - secondarySuggestions.length);

      secondarySuggestions.push(...additionalSuggestions);
    }

    return NextResponse.json({
      primaryKeywords: primarySuggestions,
      secondaryKeywords: secondarySuggestions,
    });
  } catch (error) {
    console.error("Error in Google suggestions API:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
