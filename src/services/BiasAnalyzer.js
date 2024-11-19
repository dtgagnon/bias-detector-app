class BiasAnalyzer {
  static async analyze(content) {
    try {
      // Use Firefox's text processing capabilities if available
      if ('mozInnerScreenX' in window) {
        // We're in Firefox, use native features
        return this.analyzeWithFirefox(content);
      }
      
      // Fallback to standard API
      return this.analyzeWithAPI(content);
    } catch (error) {
      console.error('Error in bias analysis:', error);
      throw error;
    }
  }

  static async analyzeWithFirefox(content) {
    // Use Firefox's Readability API to clean content
    let cleanContent = content;
    if ('Readability' in window) {
      const doc = new DOMParser().parseFromString(content, 'text/html');
      const reader = new Readability(doc);
      const article = reader.parse();
      cleanContent = article.textContent;
    }

    // Use Firefox's privacy-respecting fetch
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'DNT': '1', // Do Not Track
        'Sec-GPC': '1' // Global Privacy Control
      },
      credentials: 'same-origin',
      body: JSON.stringify({ content: cleanContent }),
    });

    if (!response.ok) {
      throw new Error('Analysis request failed');
    }

    const results = await response.json();
    return this.processResults(results);
  }

  static async analyzeWithAPI(content) {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Analysis request failed');
    }

    const results = await response.json();
    return this.processResults(results);
  }

  static processResults(results) {
    // Transform API results into a format suitable for highlighting
    return results.biases.map(bias => ({
      id: bias.id,
      type: bias.type,
      text: bias.text,
      explanation: bias.explanation,
      startIndex: bias.start,
      endIndex: bias.end,
      confidence: bias.confidence,
      category: this.categorizeBias(bias.type),
      suggestions: bias.suggestions || []
    }));
  }

  static categorizeBias(type) {
    // Categorize different types of bias
    const categories = {
      'confirmation': 'Confirmation Bias',
      'anchoring': 'Anchoring Bias',
      'availability': 'Availability Bias',
      'bandwagon': 'Bandwagon Effect',
      'authority': 'Authority Bias',
      'framing': 'Framing Effect',
      'stereotype': 'Stereotyping',
      'selection': 'Selection Bias',
      'attribution': 'Attribution Bias'
    };

    return categories[type] || 'Other Bias';
  }

  static getExplanation(biasType) {
    // Provide educational explanations for different types of bias
    const explanations = {
      'confirmation': 'Confirmation bias is the tendency to search for, interpret, and recall information in a way that confirms one\'s preexisting beliefs.',
      'anchoring': 'Anchoring bias is the tendency to rely too heavily on the first piece of information encountered when making decisions.',
      'availability': 'Availability bias is the tendency to overestimate the likelihood of events based on how easily they come to mind.',
      'bandwagon': 'Bandwagon effect is the tendency to adopt beliefs or behaviors because others have adopted them.',
      'authority': 'Authority bias is the tendency to attribute greater accuracy to the opinion of an authority figure.',
      'framing': 'Framing effect is when people react differently to a choice depending on how it is presented.',
      'stereotype': 'Stereotyping is assuming that all people or things with similar characteristics are the same.',
      'selection': 'Selection bias is the tendency to cherry-pick data that supports one\'s position.',
      'attribution': 'Attribution bias is the tendency to attribute positive events to oneself but attribute negative events to external factors.'
    };

    return explanations[biasType] || 'This represents a potential cognitive bias in the content.';
  }
}

export default BiasAnalyzer;
