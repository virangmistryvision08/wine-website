import { createSlice } from "@reduxjs/toolkit";
import blog1 from "/blogs/blog3.jpg";
import blog2 from "/blogs/blog2.jpg";
import blog3 from "/blogs/blog1.png";

const initialState = {
  allBlogs: [
    {
      blogImage: blog1,
      title:
        "“How non-alcoholic wine is made without losing the taste” Gentle Dealcoholization: How LTVD and Aroma Recovery Work",
      description: `
    <p class="description-img"><img src="http://localhost:5173/blogs/blog3.jpg" alt="blog3" width="100%" height="100%" /></p>
    <p>There’s something magical about gathering friends and family around the table &mdash; the laughter, the conversation, the aroma of home-cooked dishes — and of course, the wine. But what if not everyone drinks alcohol? The answer is simple: serve non-alcoholic wines that taste every bit as authentic as their traditional counterparts. With today’s premium selections (&lt;0.5% ABV), you can pair every course beautifully without compromise.</p>

    <h3>The Welcome Toast</h3>
    <p>Start the evening with a touch of sparkle. The Strauch Blanc Pur offers lively citrus and apple notes with fine bubbles, a natural aperitif for greeting guests. For something bolder, the Strauch Rouge Pur brings depth and red-fruit character — a festive alternative to traditional sparkling reds.</p>

    <h3>Starters &amp; Salads</h3>
    <p>Fresh, aromatic whites shine at the beginning of the meal. The Lamm Jung Riesling from the Rheingau balances bright acidity with stone fruit, making it a perfect match for seafood starters like oysters, ceviche, or prawn cocktails. For herb-driven dishes, the Nett Reverse Sauvignon Blanc or Clos de Boüard Eden (Sauvignon Blanc) provide vibrant citrus and grassy freshness that pair beautifully with goat cheese salads, asparagus, or fresh greens.</p>

    <h3>Seafood Dishes</h3>
    <p>Seafood deserves wines with lift and precision. The Nett Reverse Riesling complements grilled salmon, scallops, or sushi with its crisp minerality, while the Matthias Anton Pinot Grigio delivers a clean, refreshing line for lighter white fish. For richer dishes like lobster or creamy seafood risotto, the Breakaway Gewürztraminer adds exotic spice and floral depth without overwhelming the flavors.</p>

    <h3>BBQ Evenings</h3>
    <p>If your dinner party extends to the grill, non-alcoholic wines can rise to the occasion. Twin Evil Orange Wine offers structure and spice for grilled vegetables, skewers, or smoky BBQ chicken. For classic BBQ ribs or pulled pork, the Breakaway Merlot provides ripe plum fruit and gentle tannins that harmonize with sweet and tangy sauces. For spicier marinades, the Breakaway Pinot Noir brings freshness and balance.</p>

    <h3>Steak &amp; Rich Meats</h3>
    <p>Few moments feel as indulgent as pairing wine with a perfectly cooked steak. The Clos de Boüard Prince Oscar (Merlot–Cabernet) offers Bordeaux-style richness with enough tannin to stand up to ribeye or sirloin. The Zotz Creation Rouge, blending Pinot Noir, Merlot, and Cabernet, delivers depth and dark fruit for filet mignon or lamb chops. The Breakaway Merlot pairs beautifully with New York strip steak, where its smooth tannins and juicy fruit balance the meat’s richness, while the Breakaway Pinot Noir is perfect for leaner cuts like tenderloin, where its elegance and freshness enhance without overpowering. For chargrilled meats with bold seasoning, the Strauch Rouge Pur provides a velvety yet powerful alternative.</p>

    <h3>Dessert &amp; After Dinner</h3>
    <p>To close the evening, pour something celebratory. The Matthias Anton Blanc de Blanc Sparkling is lively and refreshing, pairing beautifully with fruit tarts and pavlova. For chocolate or darker flavors, the Strauch Rouge Pur steps back in with berry richness and velvety depth. For a gentler finish, the Matthias Anton Rosé offers soft red-fruit notes to lift lighter pastries or fresh berries.</p>

    <h3>A Feast Without Limits</h3>
    <p>A dinner party is about more than food — it’s about creating moments to share. With non-alcoholic wines from leading family estates across Germany and France, you can serve every guest, every course, every time. Authentic varietal character, elegant terroir expression, and celebratory spirit — all without the alcohol.</p>

    <p>Explore our curated collection of premium non-alcoholic wines (&lt;0.5% ABV) and find the perfect pairings for your next gathering.</p>
  `,
      by: "Ioana Rednic",
      slug: "blog-slug-1",
      createdAt: "25 September 2025",
      id: 1,
    },

    {
      blogImage: blog2,
      title:
        "The Perfect Non-Alcoholic Wines for Weddings, Brunches, Picnics, Family Celebrations, and Nights Out",
      description: `
        <p class="description-img"><img src="http://localhost:5173/blogs/blog2.jpg" alt="blog3" width="100%" height="100%" /></p>
<p>Wine has always been part of life&rsquo;s most memorable moments &mdash; toasting newlyweds, sharing a Sunday brunch, or opening a bottle at a family gathering. But today, more and more people want the full wine experience without the alcohol. Whether it&rsquo;s for health, lifestyle, or simply to feel included, non-alcoholic wines are making celebrations more inclusive than ever.</p>
<h3>Weddings</h3>
<p>A wedding toast should be unforgettable &mdash; for everyone. Sparkling non-alcoholic wines, like a crisp&nbsp;Riesling Sekt&nbsp;&lt;0.5%&nbsp;or a refined&nbsp;Blanc de Blancs &lt;0.5%&nbsp;, bring all the elegance of champagne without the limits. Guests can raise a glass, and remember the night for all the right reasons.</p>
<h3>Brunches</h3>
<p>From eggs Benedict to fresh pastries, brunch deserves a pairing. A&nbsp;dealcoholized Ros&eacute; &lt;0.5%&nbsp;with bright red-fruit notes makes a refreshing companion to lighter dishes,while an aromatic&nbsp;Sauvignon Blanc &lt;0.5%&nbsp;complements anything with herbs or greens. It feels indulgent but keeps the day easy and bright.</p>
<h3>Picnics</h3>
<p>Nothing says summer like a picnic in the park. A chilled&nbsp;non-alcoholic Pinot Noir Ros&eacute; &lt;0.5%&nbsp;or a&nbsp;fruit-forward Chardonnay &lt;0.5%&nbsp;travels beautifully, pairs with everything from cheese to grilled vegetables, and keeps the moment relaxed. No worries about overindulgence &mdash; just pure enjoyment under the sun.</p>
<h3>Family Celebrations</h3>
<p>From birthdays to baby showers, family events are more inclusive when everyone can raise a glass. Non-alcoholic wines provide that special sense of occasion while ensuring grandparents, expectant mothers, and even the designated driver feel part of the toast. Try a&nbsp;Merlot &lt;0.5%&nbsp;with roast meats or a&nbsp;sparkling Ros&eacute;&nbsp;&lt;0.5%&nbsp;with cake and desserts.</p>
<h3>Nights Out</h3>
<p>Evenings don&rsquo;t always need alcohol to feel exciting. A lively&nbsp;sparkling Blanc &lt;0.5%&nbsp;or a bold&nbsp;non-alcoholic red blend &lt;0.5%&nbsp;brings sophistication to dinners, rooftop parties,or cocktail bars. With balanced acidity and authentic varietal character, these wines let you join in the ritual of ordering, sipping, and celebrating without compromise.</p>
<h3>A New Way to Celebrate</h3>
<p>Non-alcoholic wines are not about giving something up &mdash; they&rsquo;re about opening the door wider. They let everyone at the table share the same experience, with the same aromas, flavors, and sense of joy. From wedding bells to lazy brunches, from laughter in the park to big family dinners, the right bottle ensures no one has to sit out the toast.</p>
<p>Explore our curated collection of award-winning non-alcoholic wines (&lt;0.5% ABV) and find the perfect match for your next celebration.</p>`,
      by: "Ioana Rednic",
      slug: "blog-slug-2",
      createdAt: "25 September 2025",
      id: 2,
    },
    {
      blogImage: blog3,
      title: "Hosting a Dinner Party with Wine Pairings for Everyone",
      description: `
        <p class="description-img"><img src="http://localhost:5173/blogs/blog1.png" alt="blog3" width="100%" height="100%" /></p>
<p>For a long time, non-alcoholic wines carried a reputation for being overly sweet, flat, or marked by cooked flavors. The reason was not the idea of removing alcohol itself but the technology available at the time, which stripped away not only ethanol but also the delicate aromas that make wine so distinctive.</p><br/>
<p>Gentle Low Temperature Vacuum Distillation (LTVD) has changed this. By reducing the pressure in the distillation column, alcohol can be removed at temperatures far below its normal boiling point. This means the wine no longer suffers heat damage, and its freshness, acidity, and varietal character are preserved. Instead of tasting &ldquo;cooked,&rdquo; the base wine remains vibrant and balanced.</p><br/>
<p>To preserve the delicate aromas that would otherwise be lost with the alcohol vapor, the process is paired with advanced aroma recovery. The escaping fragrance compounds are gently collected, concentrated, and later returned to the wine, restoring its authentic bouquet and complexity.</p><br/>
<p>The result is a non-alcoholic wine that expresses its terroir and varietal typicity with authenticity &mdash; pure, complex, and enjoyable. What was once a compromise has become a true wine experience, simply without alcohol.</p>
        `,
      by: "Ioana Rednic",
      slug: "blog-slug-3",
      createdAt: "25 September 2025",
      id: 3,
    },
  ],
};

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {},
});

export default blogReducer.reducer;
