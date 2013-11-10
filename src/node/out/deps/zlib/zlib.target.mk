# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := zlib
DEFS_Debug := \
	'-DOPENSSL_NO_SSL2=1' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-O0 \
	-gdwarf-2 \
	-mmacosx-version-min=10.5 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Debug := \
	-fno-strict-aliasing

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions \
	-fno-threadsafe-statics \
	-fno-strict-aliasing

# Flags passed to only ObjC files.
CFLAGS_OBJC_Debug :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Debug :=

INCS_Debug := \
	-I$(srcdir)/deps/zlib \
	-I$(srcdir)/deps/zlib/contrib/minizip

DEFS_Release := \
	'-DOPENSSL_NO_SSL2=1' \
	'-D_DARWIN_USE_64_BIT_INODE=1'

# Flags passed to all source files.
CFLAGS_Release := \
	-Os \
	-gdwarf-2 \
	-mmacosx-version-min=10.5 \
	-arch x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Release := \
	-fno-strict-aliasing

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions \
	-fno-threadsafe-statics \
	-fno-strict-aliasing

# Flags passed to only ObjC files.
CFLAGS_OBJC_Release :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Release :=

INCS_Release := \
	-I$(srcdir)/deps/zlib \
	-I$(srcdir)/deps/zlib/contrib/minizip

OBJS := \
	$(obj).target/$(TARGET)/deps/zlib/contrib/minizip/ioapi.o \
	$(obj).target/$(TARGET)/deps/zlib/contrib/minizip/unzip.o \
	$(obj).target/$(TARGET)/deps/zlib/contrib/minizip/zip.o \
	$(obj).target/$(TARGET)/deps/zlib/adler32.o \
	$(obj).target/$(TARGET)/deps/zlib/compress.o \
	$(obj).target/$(TARGET)/deps/zlib/crc32.o \
	$(obj).target/$(TARGET)/deps/zlib/deflate.o \
	$(obj).target/$(TARGET)/deps/zlib/gzio.o \
	$(obj).target/$(TARGET)/deps/zlib/infback.o \
	$(obj).target/$(TARGET)/deps/zlib/inffast.o \
	$(obj).target/$(TARGET)/deps/zlib/inflate.o \
	$(obj).target/$(TARGET)/deps/zlib/inftrees.o \
	$(obj).target/$(TARGET)/deps/zlib/trees.o \
	$(obj).target/$(TARGET)/deps/zlib/uncompr.o \
	$(obj).target/$(TARGET)/deps/zlib/zutil.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))
$(OBJS): GYP_OBJCFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE)) $(CFLAGS_OBJC_$(BUILDTYPE))
$(OBJS): GYP_OBJCXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE)) $(CFLAGS_OBJCC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-mmacosx-version-min=10.5 \
	-arch x86_64 \
	-L$(builddir)

LIBTOOLFLAGS_Debug :=

LDFLAGS_Release := \
	-mmacosx-version-min=10.5 \
	-arch x86_64 \
	-L$(builddir)

LIBTOOLFLAGS_Release :=

LIBS :=

$(builddir)/libchrome_zlib.a: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(builddir)/libchrome_zlib.a: LIBS := $(LIBS)
$(builddir)/libchrome_zlib.a: GYP_LIBTOOLFLAGS := $(LIBTOOLFLAGS_$(BUILDTYPE))
$(builddir)/libchrome_zlib.a: TOOLSET := $(TOOLSET)
$(builddir)/libchrome_zlib.a: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,alink)

all_deps += $(builddir)/libchrome_zlib.a
# Add target alias
.PHONY: zlib
zlib: $(builddir)/libchrome_zlib.a

# Add target alias to "all" target.
.PHONY: all
all: zlib

