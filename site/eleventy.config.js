module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/pbf-system.css");
    eleventyConfig.addPassthroughCopy({ "src/static-pages": "/" });
    
  // Inject password gate into all HTML
  eleventyConfig.addTransform("passwordGate", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html") && !outputPath.includes("/admin")) {      const css = '<link rel="stylesheet" href="/assets/pbf-gate.css">';
      const js = '<script src="/assets/pbf-gate.js" defer></script>';
      return content.replace('</head>', css + '\n' + js + '\n</head>');
    }
    return content;
  });

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
