// Fallback default data agar API/Database connect na ho
  const fallbackContent: PublicContentResponse = {
    siteSettings: {
      about: {
        heading: "Capturing Cinema in Everyday Moments",
        description: "Visual storyteller specializing in luxury wedding cinematography and editorial photography.",
        story: "Over a decade of experience creating timeless visual narratives across the globe.",
        yearsExperience: 10,
        projectsCompleted: 250,
        happyClients: 180,
        eventsCovered: 300,
      },
      featuredStory: {
        title: "A Royal Destination Wedding in Udaipur",
        description: "An intimate story of love, rich cultural traditions, and grand visual moments.",
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      },
      highlights: [
        { title: "Storytelling", description: "Narrative-driven visual composition." },
        { title: "Sound & Music", description: "Custom audio scoring & sound design." },
        { title: "Attention to Detail", description: "Precision color grading & editing." }
      ],
      contact: {
        email: "contact@cinematicrishabh.site",
        phone: "+91 98765 43210",
        address: "Mumbai / New Delhi, India",
        instagramUrl: "https://instagram.com",
        youtubeUrl: "https://youtube.com"
      },
      footer: {
        copyrightText: "© 2026 Rishabh Sen. All rights reserved.",
        tagline: "Cinematic Visuals & Fine Art Photography"
      }
    },
    services: [
      { id: "1", title: "Wedding Cinematography", description: "Feature-length luxury films", icon: "video", active: true },
      { id: "2", title: "Pre-Wedding Films", description: "Concept-driven visual stories", icon: "film", active: true },
      { id: "3", title: "Fashion & Commercial", description: "Editorial & brand campaigns", icon: "camera", active: true }
    ],
    portfolio: [
      { id: "1", title: "Royal Palace Wedding", category: "Weddings", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
      { id: "2", title: "Urban Editorial", category: "Commercial", imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80" }
    ],
    films: [],
    testimonials: []
  };

  // Fetch Public Content with Auto-Fallback
  const loadPublicContent = async () => {
    try {
      setLoading(true);
      const data = await fetchPublicContent();
      if (data) {
        setContent(data);
      } else {
        setContent(fallbackContent);
      }
    } catch (err) {
      console.error('Failed to load public portfolio content, using fallback:', err);
      // Backend error aane par fallback content set ho jayega
      setContent(fallbackContent);
    } finally {
      setLoading(false);
    }
  };
