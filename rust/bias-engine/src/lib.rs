use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use web_sys::console;

#[derive(Serialize, Deserialize)]
pub struct BiasResult {
    pub text: String,
    pub bias_type: String,
    pub confidence: f64,
    pub explanation: String,
    pub suggestions: Vec<String>,
}

#[wasm_bindgen]
pub struct BiasDetector {
    api_key: String,
    model: String,
}

#[wasm_bindgen]
impl BiasDetector {
    #[wasm_bindgen(constructor)]
    pub fn new(api_key: String) -> Self {
        console::log_1(&"Initializing BiasDetector...".into());
        Self {
            api_key,
            model: "gpt-4".to_string(),
        }
    }

    pub async fn analyze_text(&self, content: &str) -> Result<JsValue, JsValue> {
        let prompt = format!(
            "Analyze the following text for potential biases. For each bias found, \
            provide the specific text, type of bias, and a brief explanation:\n\n{}",
            content
        );

        let client = reqwest::Client::new();
        let response = client
            .post("https://api.openai.com/v1/chat/completions")
            .header("Authorization", format!("Bearer {}", self.api_key))
            .json(&serde_json::json!({
                "model": self.model,
                "messages": [{
                    "role": "system",
                    "content": "You are a bias detection expert. Analyze text for various types of cognitive biases."
                }, {
                    "role": "user",
                    "content": prompt
                }],
                "temperature": 0.7
            }))
            .send()
            .await
            .map_err(|e| JsValue::from_str(&e.to_string()))?;

        let result = response
            .json::<serde_json::Value>()
            .await
            .map_err(|e| JsValue::from_str(&e.to_string()))?;

        // Process the response and extract biases
        let biases = self.process_response(result)?;
        
        // Convert to JsValue
        JsValue::from_serde(&biases).map_err(|e| JsValue::from_str(&e.to_string()))
    }

    fn process_response(&self, response: serde_json::Value) -> Result<Vec<BiasResult>, JsValue> {
        // Extract the response content
        let content = response["choices"][0]["message"]["content"]
            .as_str()
            .ok_or_else(|| JsValue::from_str("Invalid API response format"))?;

        // Parse the content and create BiasResult objects
        // This is a simplified implementation - you would need to parse the actual response format
        let bias = BiasResult {
            text: "Example biased text".to_string(),
            bias_type: "confirmation_bias".to_string(),
            confidence: 0.85,
            explanation: "This text shows signs of confirmation bias...".to_string(),
            suggestions: vec!["Consider alternative viewpoints".to_string()],
        };

        Ok(vec![bias])
    }
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}
