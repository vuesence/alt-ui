**AI Prompt for Generating Vue.js UI Kit Documentation:**

"Analyze the provided Vue.js UI Kit source code to generate comprehensive, strictly technical documentation. Adhere to the following structure and guidelines:  

### **Structure & Content:**  
1. **Introduction**:  
   - Brief overview of the UI Kit’s purpose and scope. Mention only existing components (list names) and supported features.  

2. **Installation & Setup**:  
   - Exact steps to install and integrate the UI Kit into a Vue.js project. Include required dependencies, version compatibility (Vue 2/3), and build configurations if present in the code.  

3. **Component API Documentation** (for each component):  
   - **Component Name**: File name or exported name.  
   - **Description**: 1–2 sentences summarizing functionality, derived from code comments or logic.  
   - **Props**: Table with columns: Name, Type, Default, Required, Description (extract from props definitions).  
   - **Events**: Table with columns: Event Name, Payload Type, Description (extracted from `emits` or `this.$emit` usage).  
   - **Slots**: Table with columns: Slot Name, Scope Data (if any), Description (from `<slot>` definitions).  
   - **Usage Example**: Minimal code snippet demonstrating basic implementation (use current code structure; no hypothetical scenarios).  
   - **Styling**: List CSS classes, variables, or scoped styles (if defined in code).  

4. **Global Configurations**:  
   - Document theme settings, internationalization (i18n), or global props only if explicitly implemented in the code.  

### **Tone & Style**:  
- **Technical Precision**: Use concise, imperative language. Avoid marketing jargon or subjective claims.  
- **Neutrality**: Describe only existing features — omit "planned" or "future" functionality.  
- **Consistency**: Mirror the terminology and component names from the source code.  

### **Inspiration**:  
- Adopt structural clarity from libraries like Quasar, Ant Design, or Vue.js’s official docs. Prioritize scannable headings, searchable keywords, and code examples.  

### **Output Format**:  
- Generate in Markdown. Use tables for props/events/slots. Include anchor links for navigation.  
- Verify all information against the actual code—do not infer undocumented behavior."  
- Generate documentation in Russian language
