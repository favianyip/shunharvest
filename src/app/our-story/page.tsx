export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-stone-900">Our Story</h1>
          <p className="mt-4 text-lg text-stone-600">In harmony with nature</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="prose prose-stone prose-lg max-w-none">
          <h2 className="font-serif text-3xl text-stone-900">What is 旬 (Shun)?</h2>
          <p>
            <em>Shun</em> (旬) is a Japanese concept that celebrates the peak season of ingredients — 
            when flavors are at their most vibrant and nature&apos;s gifts are at their finest. 
            It represents a deep respect for the natural rhythm of the seasons.
          </p>
          <p>
            At Shun Harvest, we believe that the best fruits come from working in harmony with nature, 
            not against it. Our partner farmers across Japan dedicate their lives to nurturing fruits 
            that capture the essence of each season.
          </p>

          <h2 className="font-serif text-3xl text-stone-900 mt-12">Our Mission</h2>
          <p>
            Shun Harvest bridges the gap between Japan&apos;s most dedicated fruit artisans 
            and connoisseurs around the world who appreciate exceptional quality. We carefully 
            curate only the finest seasonal fruits from farms where generations of knowledge meet 
            cutting-edge cultivation techniques.
          </p>

          <h2 className="font-serif text-3xl text-stone-900 mt-12">The Japanese Difference</h2>
          <p>
            Japanese fruit cultivation is unlike anywhere else in the world. Here, fruit farming 
            is elevated to an art form:
          </p>
          <ul>
            <li>
              <strong>One vine, one melon:</strong> Many premium melons grow on vines where all 
              other fruit is removed, channeling all nutrients into a single perfect specimen.
            </li>
            <li>
              <strong>Hand pollination:</strong> Each flower is carefully pollinated by hand to 
              ensure the best possible fruit development.
            </li>
            <li>
              <strong>Individual attention:</strong> Fruits are often individually wrapped, 
              positioned, and monitored throughout their growth.
            </li>
            <li>
              <strong>Quality over quantity:</strong> Farmers prioritize producing fewer, 
              more perfect fruits rather than maximizing yield.
            </li>
          </ul>

          <h2 className="font-serif text-3xl text-stone-900 mt-12">Farm to Your Door</h2>
          <p>
            We work directly with our partner farms to ensure each fruit reaches you at 
            peak perfection. Weekly orders are flown fresh — direct from farm to home:
          </p>
          <ol>
            <li>Fruits are harvested at optimal ripeness</li>
            <li>Each piece is inspected and graded by experts</li>
            <li>Temperature-controlled packaging protects during transit</li>
            <li>Express shipping ensures freshness</li>
          </ol>

          <h2 className="font-serif text-3xl text-stone-900 mt-12">Join Our Journey</h2>
          <p>
            Whether you&apos;re treating yourself, gifting a loved one, or celebrating a special 
            occasion, we invite you to experience the wonder of Japanese fruit craftsmanship. 
            Each bite is a testament to the passion and dedication of farmers who have made 
            fruit growing their life&apos;s purpose.
          </p>
          <p>
            Welcome to Shun Harvest — premium high-quality seasonal fruits, in harmony with nature.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Quality</h3>
              <p className="text-stone-600">
                We never compromise on quality. Every fruit must meet our exacting standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Partnership</h3>
              <p className="text-stone-600">
                We build lasting relationships with farmers who share our commitment to excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Seasonality</h3>
              <p className="text-stone-600">
                We celebrate nature&apos;s rhythm, bringing you fruits at their peak season.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
