<script lang="ts">
  import { onMount } from 'svelte';
  import BiasAnalyzer from '$lib/services/BiasAnalyzer';
  import type { BiasResult } from '$lib/types';

  let url: string = '';
  let analyzing: boolean = false;
  let results: BiasResult | null = null;
  let error: string | null = null;

  async function analyzeUrl(): Promise<void> {
    if (!url) return;
    
    analyzing = true;
    error = null;
    
    try {
      const analyzer = new BiasAnalyzer();
      results = await analyzer.analyze(url);
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    } finally {
      analyzing = false;
    }
  }

  onMount(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  });
</script>

<main>
  <h1>Bias Detector</h1>
  
  <div class="search-container">
    <input
      type="url"
      bind:value={url}
      placeholder="Enter a URL to analyze"
      on:keydown={(e) => e.key === 'Enter' && analyzeUrl()}
    />
    <button 
      on:click={analyzeUrl}
      disabled={analyzing || !url}
    >
      {analyzing ? 'Analyzing...' : 'Analyze'}
    </button>
  </div>

  {#if error}
    <div class="error">
      {error}
    </div>
  {/if}

  {#if results}
    <div class="results">
      <h2>Analysis Results</h2>
      <div class="bias-score">
        Bias Score: {results.biasScore}
      </div>
      <div class="bias-type">
        Primary Bias Type: {results.biasType}
      </div>
      <div class="explanation">
        {results.explanation}
      </div>
      {#if results.examples && results.examples.length > 0}
        <div class="examples">
          <h3>Examples</h3>
          <ul>
            {#each results.examples as example}
              <li>{example}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #333;
    text-align: center;
  }

  .search-container {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
  }

  input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #4a4a4a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: #333;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .error {
    color: #d32f2f;
    padding: 1rem;
    background-color: #ffebee;
    border-radius: 4px;
    margin: 1rem 0;
  }

  .results {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  .bias-score {
    font-size: 1.2rem;
    margin: 1rem 0;
  }

  .examples ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .examples li {
    margin: 0.5rem 0;
  }
</style>
