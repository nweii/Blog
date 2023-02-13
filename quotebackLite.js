document.addEventListener("DOMContentLoaded", function() {
  // get all blockquotes with class "quoteback"
  const index = document.querySelectorAll(".quoteback");
  // Or replace with document.getElementsByTagName('blockquote') to apply to all blockquotes

  const css = "/assets/styles/quoteCard.css";

  for (var item = 0; item < index.length; item++) {
    let blockquote = index[item];
    console.log("Rebuilding blockquote:");
    console.log(blockquote);

    // get blockquote data
    const text = blockquote.innerHTML;
    const url = blockquote.cite;
    const author = blockquote.getAttribute("data-author");
    const title = blockquote.getAttribute("data-title");
    const favicon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}&sz=64`;

    // create a new component with that data
    const component = `
			<quoteback-component url="${url}" text="${encodeURIComponent(
      text
    )}" author="${author}" title="${title}" favicon="${favicon}"> 
			</quoteback-component>    
			`;
    // nest the component inside a div
    let newDiv = document.createElement("div");
    newDiv.innerHTML = component;

    // replace the original blockquote with our div
    blockquote.parentNode.replaceChild(newDiv, blockquote);

    let template = document.createElement("template");
    template.innerHTML = `
			<link href="${css}" rel="stylesheet">
      <div id="quoteback-container" class="mb-6 max-w-[70ch] rounded-lg border border-solid border-stone-300/80 bg-stone-50/80 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:border-stone-50/10 dark:bg-stone-800/90 dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15),0_8px_10px_-6px_rgba(0,0,0,0.15)] [@media(hover:none)]:shadow-lg" role="quotation" aria-labelledby="quoteback-author" tabindex="0">
        <div id="quoteback-parent" class="relative box-border w-full overflow-hidden">
          <div id="quoteback-content" class="prose prose-stone px-4 py-3 leading-relaxed text-stone-900/80 prose-p:mb-1 prose-a:underline prose-a:underline-offset-2 prose-a:transition-opacity hover:prose-a:cursor-pointer hover:prose-a:opacity-50 prose-blockquote:mt-0 prose-blockquote:mb-1 prose-ol:mt-0 prose-ul:mt-0 dark:prose-invert dark:text-stone-50/80 dark:hover:prose-a:text-emerald-300"></div>
        </div>
        <div id="quoteback-head" class="flex flex-row flex-nowrap items-stretch justify-start border-t border-stone-300/80 pl-4 dark:border-stone-50/10">
          <div id="quoteback-avatar" class="!min-w-10 relative my-2 mx-0 w-5 flex-none rounded-full border-stone-300/80 dark:border-stone-50/10 max-[336px]:w-4 max-[304px]:hidden"><img id="mini-favicon" class="max-w-5 absolute inset-y-0 left-0 m-auto aspect-square w-full rounded-sm" alt="source website favicon" src="" /></div>
          <div id="quoteback-metadata" class="ml-3 flex min-w-0 shrink items-center max-[304px]:ml-0">
            <div id="metadata-inner" class="my-3 w-full pr-2 text-sm font-semibold leading-normal">
              <div aria-label="" id="quoteback-author" class="mb-0.5 text-stone-900/80 dark:text-stone-50/80 line-clamp-1"></div>
              <div aria-label="" id="quoteback-title" class="pr-4 font-medium text-stone-500 line-clamp-2 dark:text-stone-50/70"></div>
            </div>
          </div>
          <div id="quoteback-backlink" class="ml-auto flex w-5 items-center justify-center border-l border-stone-300/80 py-0 px-4 dark:border-stone-50/10"><a target="_blank" aria-label="go to the full text of this quotation" rel="noopener" href="" id="quoteback-arrow" class="border-none text-lg text-stone-500 no-underline transition-colors transition-transform hover:-translate-y-0.5 hover:text-emerald-500 dark:text-stone-50/70 dark:hover:text-emerald-300"><span class="right-arrow">&#8594;</span></a></div>
        </div>
      </div>`;

    class QuoteBack extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.text = decodeURIComponent(this.getAttribute("text"));
        this.author = this.getAttribute("author");
        this.title = decodeURIComponent(this.getAttribute("title"));
        this.url = this.getAttribute("url");
        this.favicon = this.getAttribute("favicon");
        this.editable = this.getAttribute("editable");
        this.darkmode = this.getAttribute("darkmode");
      }

      connectedCallback() {
        this.shadowRoot.querySelector("#quoteback-content").innerHTML =
          decodeURIComponent(this.getAttribute("text"));
        this.shadowRoot.querySelector("#mini-favicon").src =
          this.getAttribute("favicon");

        this.shadowRoot.querySelector("#quoteback-author").innerHTML =
          this.getAttribute("author");
        this.shadowRoot
          .querySelector("#quoteback-author")
          .setAttribute(
            "aria-label",
            "quote by " + this.getAttribute("author")
          );

        this.shadowRoot.querySelector("#quoteback-title").innerHTML =
          decodeURIComponent(this.getAttribute("title"));
        this.shadowRoot
          .querySelector("#quoteback-title")
          .setAttribute(
            "aria-label",
            "title: " + decodeURIComponent(this.getAttribute("title"))
          );

        this.shadowRoot.querySelector("#quoteback-arrow").href =
          this.getAttribute("url");
      }
    }

    // if quoteback-component is already defined
    if (customElements.get("quoteback-component")) {
      null;
    } else {
      window.customElements.define("quoteback-component", QuoteBack);
    }
  }
});