import { has, get, set, isUndefined, noop } from 'lodash';

export default function KeyboardConfiguration(debug = true) {
  let globalsCommands = undefined;
  let pageCommands = undefined;
  const commands = {};
  let disabled = false;
  let pageCommandsDisabled = false;
  let globalsCommandsDisabled = false;

  /*
  INTERNAL FUNCTIONS
   */

  /**
   * Try to find a command for the given event
   *
   * @param  {Object}   [commands={}] Command map
   * @param  {Event}    ev            Key event
   * @param  {Function} defaultReturn Default return value if no command was found
   *
   * @return {Function} command Command for the given key or noop
   */
  function getEventCommand(commands = {}, ev, defaultReturn) {
    const key = get(ev, 'key');
    const keyCode = get(ev, 'keyCode');

    // Try to find a command to execute for the given key
    // Commands rule everything as they can be registered per component (and removed on unmount)
    // Then check page commands and global commands.
    // Prefer key code but add fallback to key
    return get(
      commands,
      keyCode,
      get(
        commands,
        key,
        defaultReturn
      )
    );
  }

  /**
   * Event handler for key down event
   *
   * @param  {Event} ev Key down event
   *
   * @return void
   */
  function handleKeyDown(ev) {
    if (disabled) return;

    const command = getEventCommand(
      commands,
      ev,
      pageCommandsDisabled
        ? noop
        : getEventCommand(
          pageCommands,
          ev,
          globalsCommandsDisabled
            ? noop
            : getEventCommand(globalsCommands, ev, noop)
        )
    );


    console.log('GUGUSELI', command, ev);

    get(command, 'func', noop)(ev);
  }

  /*
  EXPORTED FUNCTIONS
   */

  /**
   * Get the current registered command for the given ke
   *
   * @param  {String/Number} key KeyCode or key
   *
   * @return {[Function]} command Current command or undefined
   */
  function getCurrentCommand(key) {
    return get(commands, key);
  }

  /**
   * Register a command for the given key.
   * Throw an error if there is already a command for the given key registered
   *
   * @param  {String/Number} key  KeyCode or key
   * @param  {Function}      func Command to execute
   *
   * @return void
   */
  function registerCommand(key, func, description) {
    if (debug) console.warn(`Register command for key ${key} with ${func}`)
    if (has(commands)) throw new Error(`Keyboard command for key ${key} already registered!`);

    set(commands, key, { func, description });
  }

  /**
   * Explicitly replace (or add) a command (ignore existing command)
   *
   * @param  {String/Number} key  KeyCode or key
   * @param  {Function}      func Command to execute
   *
   * @return void
   */
  function replaceCommand(key, func, description) {
    if (debug) console.warn(`Replace command for key ${key} with ${func}`);
    set(commands, key, { func, description });
  }

  /**
   * Unregister the given command
   *
   * @param  {String/Number} key  KeyCode or key
   *
   * @return void
   */
  function unregisterCommand(key) {
    if (debug) console.log(`Unregister command for key ${key}`);
    if (has(commands, key)) delete commands[key];
  }

  /**
   * Register global commands.
   * Throw an error if already done
   *
   * @param  {Object} commands Command map
   *
   * @return void
   */
  function registerGlobalCommands(commands) {
    if (debug) console.warn('Register global commands', commands);
    if (!isUndefined(globalsCommands)) throw new Error('Global commands already registered!')

    // Spread to make sure commands are not edited by accident
    globalsCommands = { ...commands };
  }

  /**
   * Explicitly replace (or set) global commands.
   *
   * @param  {Object} commands Command map
   *
   * @return void
   */
  function replaceGlobalCommands(commands) {
    if (debug) console.warn('Replace global commands', commands)
    // Spread to make sure commands are not edited by accident
    globalsCommands = { ...commands };
  }

  /**
   * Register page commands.
   * Throw an error if already done
   *
   * @param  {Object} commands Command map
   *
   * @return void
   */
  function registerPageCommands(commands) {
    if (debug) console.warn('Reqister page commands', commands);
    if (!isUndefined(pageCommands)) throw new Error('Page commands already registered. Did you forgeth to unregister on unmount?');

    pageCommands = { ...commands };
  }

  /**
   * Explicitly replace (or set) page commands.
   *
   * @param  {Object} commands Command map
   *
   * @return void
   */
  function replacePageCommands(commands) {
    if (debug) console.warn('Replace page commands', commands);
    pageCommands = { ...commands };
  }

  /**
   * Unrgister page commands
   *
   * @return void
   */
  function unregisterPageCommands() {
    if (debug) console.warn('Unregister page commands')
    pageCommands = undefined;
  }

  /**
   * Enable keyboard handling
   *
   * @return void
   */
  function enable() {
    disabled = false;
  }

  /**
   * Disable keyboard handling
   *
   * @return void
   */
  function disable() {
    disabled = true;
  }

  /**
   * Enable keyboard handling for page and globals
   *
   * @return void
   */
  function enablePageCommands() {
    pageCommandsDisabled = false;
  }

  /**
   * Disable keyboard handling for page and globals
   *
   * @return void
   */
  function disablePageCommands() {
    pageCommandsDisabled = true;
  }

  /**
   * Enable keyboard handling for globals
   *
   * @return void
   */
  function enableGlobalCommands() {
    globalsCommandsDisabled = false;
  }

  /**
   * Disable keyboard handling for globals
   *
   * @return void
   */
  function disableGlobalCommands() {
    globalsCommandsDisabled = true;
  }

  document.addEventListener('keydown', handleKeyDown);

  return Object.freeze({
    registerCommand,
    replaceCommand,
    unregisterCommand,
    registerGlobalCommands,
    replaceGlobalCommands,
    registerPageCommands,
    replacePageCommands,
    unregisterPageCommands,
    enable,
    disable,
    enablePageCommands,
    disablePageCommands,
    enableGlobalCommands,
    disableGlobalCommands,
    getCurrentCommand
  });
}
