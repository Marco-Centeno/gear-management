// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let splashscreen_window = app.get_webview_window("splashscreen").unwrap();

            let main_window = app.get_webview_window("main").unwrap();
            let size = main_window.outer_size().unwrap();
            main_window.hide().unwrap();

            if let Ok(monitor) = splashscreen_window.current_monitor() {
                if let Some(monitor) = monitor {
                    let screen_size = monitor.size();
                    let window_size = splashscreen_window.outer_size().unwrap();

                    let x = (screen_size.width - window_size.width) / 2;
                    let y = (screen_size.height - window_size.height) / 2;

                    splashscreen_window
                        .set_position(tauri::PhysicalPosition::new(x, y))
                        .unwrap();

                    main_window
                        .set_position(tauri::PhysicalPosition::new(x, y))
                        .unwrap();
                }
            }

            splashscreen_window.show().unwrap();
            splashscreen_window.set_focus().unwrap();

            // we perform the initialization code on a new task so the app doesn't freeze
            tauri::async_runtime::spawn(async move {
                let new_size = tauri::PhysicalSize::new(size.width - 1, size.height - 1);
                main_window.set_size(new_size).unwrap();

                // initialize your app here instead of sleeping :)
                println!("Initializing...");
                std::thread::sleep(std::time::Duration::from_secs(7));
                println!("Done initializing.");

                // After it's done, close the splashscreen and display the main window
                splashscreen_window.close().unwrap();

                //main_window.set_size(tauri::Size::Physical(size)).unwrap();
                main_window.show().unwrap();
                main_window.set_focus().unwrap();
            });
            Ok(())
        })
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
