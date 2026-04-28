module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/pbf-system.css");
    eleventyConfig.addPassthroughCopy({ "src/static-pages": "/" });

    eleventyConfig.addCollection("projects", function (collectionApi) {
          return collectionApi
            .getFilteredByGlob("src/projects/*.md")
            .filter((item) => item.data.visible !== false)
            .sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
    });

    return {
          dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
          templateFormats: ["njk", "md", "html"],
          htmlTemplateEngine: "njk",
          markdownTemplateEngine: "njk",
    };
};
