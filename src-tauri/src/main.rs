#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use clipboard::{ClipboardContext, ClipboardProvider};
// use std::thread;
// use std::time::Duration;

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_clipboard])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_clipboard() -> Result<String, String>{
    
    let mut clipboard: ClipboardContext = ClipboardProvider::new().map_err(|err| err.to_string())?;

    // Attempt to read the clipboard contents
    match clipboard.get_contents() {
        Ok(contents) => Ok(contents),
        Err(err) => Err(err.to_string()),
    }
}