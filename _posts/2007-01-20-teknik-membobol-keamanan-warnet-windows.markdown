---
author: udienz
comments: true
date: 2007-01-20 18:30:05+00:00
layout: post
published: false
slug: teknik-membobol-keamanan-warnet-windows
title: otak-atik vbs
wordpress_id: 467
categories:
- '*indows'
- Hack
---

huh, kadang kala di warnet semua akses di tutup, mulai dari Run, find/search, Control Panel, dll. gimana ya caranya menjebolnya..... mode side 2 <bejat> layer 2 <guyon> aktif. let's go!!!

buka notepad, (bener2 keterlaluan kalo notepad aja di blok!!!)  cut n paste script berikut:

--start--

    
    On error resume next
    Dim Reg
    Set Reg = CreateObject("WScript.Shell")
    
    if msgbox("Kembalikan menu Run ?" , VbOkCancel) = VbOK then
    Reg.RegWrite "HKEY_CURRENT_USERSoftwareMicrosoftWindowsCurrentVersionPoliciesExplorerNoRun", "0", "REG_DWORD"
    end if
    
    if msgbox("Enable Registry Tool ?" , VbOkCancel) = VbOK then
    Reg.RegWrite "HKEY_CURRENT_USERSoftwareMicrosoftWindowsCurrentVersionPoliciesSystemDisableRegistryTools", "0", "REG_DWORD"
    end if
    
    if msgbox("Perlihatkan file hidden" , VbOkCancel) = VbOK then
    Reg.RegWrite "HKEY_CURRENT_USERSoftwareMicrosoftWindowsCurrentVersionPoliciesExplorerAdvancedHidden", "1", "REG_DWORD"
    end if
    
    if msgbox("Kembalikan menu Find" , VbOkCancel) = VbOK then
    Reg.RegWrite "HKEY_CURRENT_USERSoftwareMicrosoftWindowsCurrentVersionPoliciesExplorerNoFind", "0", "REG_DWORD"
    end if
    
    if msgbox("Kembalikan menu Option" , VbOkCancel) = VbOK then
    Reg.RegWrite "HKEY_CURRENT_USERSoftwareMicrosoftWindowsCurrentVersionPoliciesExplorerNoFolderOptions", "0", "REG_DWORD"
    end if
    
    if msgbox("Enable Taskmanager" , VbOkCancel) = VbOK then
    Reg.RegWrite "HKEY_CURRENT_USERSoftwareMicrosoftWindowsCurrentVersionPoliciesSystemDisableTaskMgr", "0", "REG_DWORD"
    end if
    
    if msgbox("Disable File Extensi" , VbOkCancel) = VbOK then
    Reg.RegWrite "HKEY_CURRENT_USERsoftwaremicrosoftwindowscurrentversionexploreradvancedHideFileExt", "0", "REG_DWORD"
    end if
    
    if msgbox("Perlihatkan Log Off" , VbOkCancel) = VbOK then
    Reg.RegWrite "HKEY_CURRENT_USERsoftwaremicrosoftwindowscurrentversionexploreradvancedStartMenuLogoff", "1", "REG_DWORD"
    end if
    MsgBox"Registry kamu berhasil di optimasi, silakan logOff", vbinformation,"Selamat"
    MsgBox"creat3d bY udienz.wordpress.com", vbinformation,"Selamat"


---end--

nah nih untuk membuka/enable run, hide file ext, dll. simpan dengan <namafile>.vbs dan klik untuk mengeksekusi. welcome to your imagine!!!!
eh ada lagi nih untuk mengoptimasi kompi temen2

--mulai--

    
    Dim WshShell
    Set WshShell = WScript.CreateObject("WScript.Shell")
    WshShell.RegWrite "HKCUControl PanelDesktopMenuShowDelay", "0", "REG_DWORD"
    WshShell.RegWrite "HKCUSoftwareMicrosoftWindowsCurrentVersionPoliciesExplorerNoLowDiskSpaceChecks", "0", "REG_DWORD"
    WshShell.RegWrite "HKLMSYSTEMCurrentControlSetControlWaitToKillServiceTimeout", "0", "REG_SZ"
    WshShell.RegWrite "HKCUControl PanelDesktopPaintDesktopVersion", "1", "REG_DWORD"
    MsgBox"Registry kamu berhasil di optimasi, silakan logOff", vbinformation,"Selamat"
    MsgBox"creat3d bY udienz.wordpress.com", vbinformation,"Selamat"
    WshShell.RegWrite "HKLMSystemControlSet001ControlWaitToKillServiceTimeout", "1", "REG_DWORD"
    WshShell.RegWrite "HKCUControl PanelDesktopWaitToKillAppTimeout", "0", "REG_SZ"
    WshShell.RegWrite "HKCUControl PanelDesktopAutoEndTask", "1", "REG_SZ"
    WshShell.RegWrite "HKLMSYSTEMCurrentControlSetControlSession ManagerMemory ManagementPrefetchParametersEnablePrefetcher", "5", "REG_DWORD"


--end--
