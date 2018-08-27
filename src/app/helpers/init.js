//
// Init - Methods for component initialization
//

/**
 * Initialize one component based on the given selector (container)
 * @param {Function} Component - A component that is about to be initialized
 * @param {Element} container - A selector of the component container
 * @param {Any} ...args - Additional arguments passed as options for component
 * @return {Function|undefined} - Return new instance of the component if it exists, otherwise return undefined
 */
export function init(Component, container, ...args) {
  try {
    if (container) {
      if (firstInit(Component, container)) {
        return new Component(container, ...args);
      }
    }
  } catch (e) {
    console.error(e);
  }

  return undefined;
}

/**
 * Initialize one or more components based on the given selector (containers)
 * @param {Function} Component - A component that is about to be initialized
 * @param {Element} containers - A selector of the component containers
 * @param {Any} ...args - Additional arguments passed as options for component
 * @return {Function|undefined} - Return new instances of the component if it exists, otherwise return undefined
 */
export function initMultiple(Component, containers, ...args) {
  try {
    return [...containers].map((container) => {
      if (firstInit(Component, container)) {
        return new Component(container, ...args);
      }

      return undefined;
    });
  } catch (e) {
    console.error(e);
  }

  return undefined;
}

/**
 * Check if the component is already initialized - works only if minification of function names is disabled!
 * @param {Function} Component - A component that is about to be initialized
 * @param {Element} container - The JS component's container
 * @return {Boolean} - If the script should continue or not
 */
function firstInit(Component, container) {
  const componentName = Component.name.toLowerCase();
  const initClass = `js-${componentName}-ready`;

  if (container.classList.contains(initClass)) {
    return false;
  }

  container.classList.add(initClass);

  return true;
}
